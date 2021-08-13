const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  authorID: {
    type: String,
  },
});
module.exports = model("Book", BookSchema);
