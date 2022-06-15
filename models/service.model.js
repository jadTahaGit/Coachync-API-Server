const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    title: {
      type: String,
      // required: true,
      minlength: 5,
    },
    username: { type: Schema.Types.ObjectId, ref: "User" },
    // password: { type: Schema.Types.ObjectId, ref: "Users" },
    // coachLevel: { type: Schema.Types.ObjectId, ref: "Users" },
    // SeviceStars: {
    //   type: String,
    // },
    // Media: { type: String },
    // Description: {
    //   title: {
    //     type: String,
    //     required: true,
    //     minlength: 5,
    //   },
    //   textArea: {
    //     type: String,
    //     required: true,
    //     minlength: 25,
    //   },
    // },
    // aboutTheSeller: {
    //   username: { type: Schema.Types.ObjectId, ref: "Users" },
    //   catagory: {
    //     type: String,
    //     required: true,
    //   },
    // },
  },
  { timestamps: true }
);

const Server = mongoose.model("Server", userSchema);
module.exports = Server;
