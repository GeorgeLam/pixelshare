// call all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const AWS = require("aws-sdk");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

// const image = require("../models/models");

require("dotenv").config();

//CREATE EXPRESS APP
const app = express();

app.use(cors());

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// const loader = multer({
//   storage: storage,
// });

//Multer end

// ROUTES: Fetching photo data
app.post("/photos", function (req, res) {
  // res.sendFile("/index.html", { root: "./server" });
  let query = null;
  let limitNum = 3;
  let skipNum = 0;
  if (req.body) {
    console.log(req.body);
    if (req.body.queryType == "recent") {
      query = {};
    }
    if (req.body.queryType == "moreRecentPhotos") {
      query = {};
      limitNum += 3;
      // skipNum += 5;
    }
    if (req.body.queryType == "user") {
      query = { author: req.body.author };
      limitNum = 0;
    }
    if (req.body.queryType == "single") query = { fileName: req.body.fileName };

    MongoClient.connect(process.env.DB_Conn, async function (err, db) {
      if (err) throw err;
      try {
        await db
          .db("Pixelshare")
          .collection("photos")
          .find(query)
          .sort({ uploadTime: -1 })
          .limit(limitNum)
          .skip(skipNum)
          .toArray()
          .then((docs) => {
            // console.log(docs);
            res.send(docs);
          });
        db.close();
      } catch (err) {
        console.log(err);
        res.json({ msg: err });
      }
    });
  }
});

//Route: updating
app.post("/photoUpdate", function (req, res) {
  console.log("photoUpdate API hit", req.body);
  let query = null;
  if (req.body.queryType == "like") {
    req.body.likeStatus
      ? (command = { $pull: { likes: req.body.currentUser } })
      : (command = { $addToSet: { likes: req.body.currentUser } });
  }

  if (req.body.queryType == "comment") {
    console.log("New comment received...");
    command = {
      $addToSet: {
        comments: {
          user: req.body.currentUser,
          comment: req.body.commentValue,
          commentTime: Date.now(),
        },
      },
    };
  }

  if (req.body.queryType == "commentDelete") {
    console.log("New comment deletion...");
    command = {
      $pull: {
        comments: { commentTime: req.body.commentTime, user: req.body.author },
      },
    };
  }

  if (req.body.queryType == "photoDelete") {
    console.log("New image deletion...");

    MongoClient.connect(process.env.DB_Conn, async function (err, db) {
      if (err) throw err;
      try {
        await db
          .db("Pixelshare")
          .collection("photos")
          .deleteOne({ fileName: req.body.fileName })
          .then((docs) => {
            console.log("deleted...", docs);
            res.send(docs);
          });
        db.close();
      } catch (err) {
        console.log("ERRRRRRRRRRRRRR", err);
        res.json({ msg: err });
      }
    });
    return;
  }

  MongoClient.connect(process.env.DB_Conn, async function (err, db) {
    if (err) throw err;
    try {
      await db
        .db("Pixelshare")
        .collection("photos")
        .findOneAndUpdate(
          {
            fileName: req.body.fileName,
          },
          command,
          { returnOriginal: false }
        )
        .then((docs) => {
          console.log("zzzzz", docs.value);
          res.send(docs.value);
        });
      db.close();
    } catch (err) {
      console.log("ERRRRRRRRRRRRRR", err);
      res.json({ msg: err });
    }
  });
});

//Route: uploading
app.post("/api", upload.single("imageUpload"), async function (req, res, next) {
  if (req.body.type == "profilePhoto") {
    console.log("Receiving image upload: ", req.body);
    uploadFile(req.file.buffer, req.body.username);
    console.log("Done");
    res.send("success");
    return;
  }

  console.log("Node has received something...");
  console.log(req.file);
  let fileName = Date.now() + req.file.originalname;

  //Checking that user has not exceeded upload limits:

  MongoClient.connect(process.env.DB_Conn, async function (err, db) {
    if (err) throw err;
    try {
      await db
        .db("Pixelshare")
        .collection("photos")
        .find({ author: req.body.authorName })
        .sort({ uploadTime: -1 })
        .toArray()
        .then((docs) => {
          console.log(docs.length);
          if (docs.length > 9) {
            res.send({
              error: `Sorry, you have reached the upload limit. You may only upload nine files.`,
            });
            return;
          }
          console.log("Upload limit hasn't been exceeded, uploading...");
          uploadFile(
            req.file.buffer,
            req.body.authorName,
            fileName,
            req.body.caption
          );
          res.send({
            success: `https://pixelshare.s3.eu-west-2.amazonaws.com/${fileName}`,
          });
        });
      db.close();
    } catch (err) {
      console.log(err);
      res.json({ msg: err });
    }
  });
});

app.post("/signup", function (req, res) {
  console.log(req.body); //WORKS!!
  res.send({ Response: req.body.username });
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) console.log(err);
    console.log(hash);
  });
});

app.post("/login", function (req, res) {
  console.log(req.body); //WORKS!!
  // res.send({ Response: req.body.username });
  bcrypt.compare(
    req.body.password,
    /////////////,
    function (err, result) {
      // result == true
      if (err) console.log(err);
      else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

//AWS Start
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET,
});

const uploadFile = (fileContent, authorName, fileName, caption) => {
  console.log("Uploading photo to aws");
  let profilePhotoUpload;

  if (!fileName) {
    profilePhotoUpload = true;
  }

  const params = {
    Bucket: process.env.BUCKET,
    Key: fileName || authorName,
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  // Uploading image to AWS
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(`File uploaded successfully. ${data.Location}`);

    if (profilePhotoUpload)
      return { success: `File uploaded successfully. ${data.Location}` };
    console.log("PP changes shouldn't show this");
    //Uploading file reference (name and upload date) to MongoDB
    MongoClient.connect(process.env.DB_Conn, function (err, db) {
      if (err) throw err;
      db.db("Pixelshare")
        .collection("photos")
        .insertOne(
          {
            fileName: data.key,
            author: authorName,
            caption: caption,
            uploadTime: Date.now(),
          },
          function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          }
        );
    });
  });
};

app.post("/profile", function (req, res) {
  console.log(req.body); //WORKS!!

  MongoClient.connect(process.env.DB_Conn, async function (err, db) {
    if (err) throw err;
    try {
      await db
        .db("Pixelshare")
        .collection("users")
        .find({ username: req.body.username })
        .toArray()
        .then((docs) => {
          // console.log(docs);
          res.send(docs);
        });
      db.close();
    } catch (err) {
      console.log(err);
      res.json({ msg: err });
    }
  });

  // res.send({ Response: req.body});
});

app.post("/updateProfile", function (req, res) {
  console.log("UPDATING PROFILE", req.body);

  MongoClient.connect(process.env.DB_Conn, async function (err, db) {
    if (err) throw err;
    try {
      await db
        .db("Pixelshare")
        .collection("users")
        .findOneAndUpdate(
          {
            username: req.body.username,
          },
          {
            $set: { bio: req.body.bio },
          },

          { returnOriginal: false, upsert: true }
        )
        .then((docs) => {
          // console.log("zzzzz", docs);
          console.log("Updated!");
          res.send(docs);
        });
      db.close();
    } catch (err) {
      console.log("Error!", err);
      res.json({ msg: err });
    }
  });
});

let port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
