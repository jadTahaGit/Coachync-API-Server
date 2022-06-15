const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    birthDay: {
      type: Date,
    },
    email__verified: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    isCoach: {
      type: Boolean,
    },
    languages: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    level: {
      type: Number,
    },
    percatageOfCompletion: {
      type: Number,
    },
    Country: {
      type: String,
    },
    AccountCreationDate: {
      type: Date,
    },
    AvgResponseTime: {
      type: Number,
    },
    lastSession: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static Mehtod to login user
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email: email });
  if (user) {
    // compares hashed passwords!
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Wrong Password!");
  }
  throw Error("Incorrect Email!");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
