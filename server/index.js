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
  if (req.body) {
    console.log(req.body);
    if (req.body.queryType == "recent") query = {};
    if (req.body.queryType == "user") query = { author: req.body.author };
    if (req.body.queryType == "single") query = { fileName: req.body.fileName };

    MongoClient.connect(process.env.DB_Conn, async function (err, db) {
      if (err) throw err;
      try {
        await db
          .db("Pixelshare")
          .collection("photos")
          .find(query)
          .sort({ uploadTime: -1 })
          .limit(3)
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
  console.log("Node has received something...");
  console.log(req.file);
  // console.log("!!!!!!!!!!!!!!!!!!!", req.body);
  // console.log(req.body.authorName);
  let fileName = Date.now() + req.file.originalname;
  // let authorName = "example";
  // res.send({ Response: "Received by node" });

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
          if (docs.length > 5) {
            res.send({
              error: `Sorry, you have reached the upload limit. You may only upload nine files.`,
            });
            return;
          }
          console.log("Upload limit hasn't been exceeded, uploading...");
          uploadFile(
            req.file.buffer,
            fileName,
            req.body.authorName,
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

const uploadFile = (fileContent, fileName, authorName, caption) => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: fileName,
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

app.listen(5000, () => console.log("Server started on port 5000"));
