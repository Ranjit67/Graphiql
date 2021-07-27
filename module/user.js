const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    require: true,
    type: String,
  },
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
// userSchema.pre("save", async () => {
//   console.log(this.password);
//   // const hash = bcrypt.hash(this.password, 10);
//   // this.password = hash;
//   next();
// });
module.exports = mongoose.model("User", userSchema);
