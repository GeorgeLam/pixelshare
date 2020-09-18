// call all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

//CREATE EXPRESS APP
const app = express();

app.use(cors());

// app.use(bodyParser.json());
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const loader = multer({
  storage: storage,
});

// ROUTES
app.get("/", function (req, res) {
  res.sendFile("/index.html", { root: "./server" });
});

app.post("/api", loader.single("imageUpload"), function (req, res, next) {
  console.log("Received something...");
  console.log(req.file);
  res.send({ Response: "Successfully uploaded!" });
});

app.listen(5000, () => console.log("Server started on port 5000"));
