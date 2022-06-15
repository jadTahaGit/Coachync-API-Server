const jwt = require("jsonwebtoken");
let User = require("../models/user.model");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is not correct";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createToken = (id) => {
  const maxAge = 7 * 24 * 60 * 60; //in seconds
  return jwt.sign({ id }, "jad", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
};

module.exports.signup_post = async (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const birthDay = req.body.birthDay;
  const email__verified = req.body.email__verified;
  const category = req.body.category;
  const phoneNumber = req.body.phoneNumber;
  const isCoach = req.body.isCoach;
  const languages = req.body.languages;
  const description = req.body.description;
  const rating = req.body.rating;
  const level = req.body.level;
  const percatageOfCompletion = req.body.percatageOfCompletion;
  const Country = req.body.Country;
  const AccountCreationDate = req.body.AccountCreationDate;
  const AvgResponseTime = req.body.AvgResponseTime;
  const lastSession = req.body.lastSession;

  try {
    const user = await User.create({
      username: username,
      name: name,
      email: email,
      password: password,
      birthDay: birthDay,
      email__verified: email__verified,
      category: category,
      phoneNumber: phoneNumber,
      isCoach: isCoach,
      languages: languages,
      description: description,
      rating: rating,
      level: level,
      percatageOfCompletion: percatageOfCompletion,
      Country: Country,
      AccountCreationDate: AccountCreationDate,
      AvgResponseTime: AvgResponseTime,
      lastSession: lastSession,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json({ errors });
  }
};
