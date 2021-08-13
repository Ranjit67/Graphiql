const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = model("Author", AuthorSchema);
