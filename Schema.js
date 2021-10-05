const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let detail = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },

 gender: {
    type: String
  }
});

module.exports = mongoose.model("mock", detail);