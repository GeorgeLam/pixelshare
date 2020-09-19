const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let image = new Schema({
  fileName: {
    type: String,
  },
  uploadTime: {
    type: Number,
  },
  author: {
    type: String,
  },
});

module.exports = mongoose.model("image", image);
