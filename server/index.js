// call all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const AWS = require("aws-sdk");
const fs = require("fs");
const { MongoClient } = require("mongodb");

require("dotenv").config();

//CREATE EXPRESS APP
const app = express();

app.use(cors());

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//Multer start
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
//   // buffer: function(req, file, cb)
// });

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// const loader = multer({
//   storage: storage,
// });

//Multer end

//MongoDB start
async function run() {
  await mongoose.connect(
    process.env.DB_Conn,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to Pixelshare MongoDB");
    }
  );
}

// run();

async function main() {
  const client = new MongoClient(process.env.DB_Conn);

  async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  }

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

//MongoDB end

// ROUTES
app.get("/", function (req, res) {
  res.sendFile("/index.html", { root: "./server" });
});

app.post("/api", upload.single("imageUpload"), async function (req, res, next) {
  console.log("Node has received something...");
  let fileName = Date.now() + req.file.originalname;
  // res.send({ Response: "Received by node" });
  uploadFile(req.file.buffer, fileName);

  res.send({
    location: "https://pixelshare.s3.eu-west-2.amazonaws.com/" + fileName,
  });
});

//AWS Start
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET,
});

const uploadFile = (fileContent, fileName) => {
  // Read content from the file
  // const fileContent = fs.readFileSync(fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(`File uploaded successfully. ${data.Location}`);
    // returningLoc = data.Location;
    // console.log(returningLoc, "hi");
  });

  // let inner = () => {
  //   // return (salads = "THere are salads!!");
  //   let returningLoc;
  //   s3.upload(params, function (err, data) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(data);
  //     console.log(`File uploaded successfully. ${data.Location}`);
  //     this.returningLoc = data.Location;
  //     console.log(returningLoc, "hi");
  //   });

  //   return returningLoc;
  // };
  // console.log(returningLoc, "outer");
};

app.listen(5000, () => console.log("Server started on port 5000"));
