const mongoose = require("mongoose");

const HashSchema = new mongoose.Schema({
  nickname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  hash: {
    type: String
  }
});

const hashForEmail = mongoose.model("HashForEmail", HashSchema);
module.exports = hashForEmail;
