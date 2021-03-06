import User from "../models/User.js";
import Service from "../models/Service.js";
import JWT from "jsonwebtoken";
import { Server } from "socket.io";

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email:
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }
  // incorrect password:
  if (err.message === "incorrect password") {
    errors.password = "that password is  incorrect";
  }
  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
  }
  if (err.message.includes("users validation failed")) {
    // validation errors
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// create Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return JWT.sign({ id }, "FedJadPedKarAli2022", {
    expiresIn: maxAge,
  });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Got The Users!",
      result: {
        users,
      },
      redirect: "/",
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({
      code: 400,
      success: false,
      message: "Failed to get users",
      result: { errors },
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    console.log(req.params.id);
    const users = await User.find({ _id: req.params.id });
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Got The Users!",
      result: {
        users,
      },
      redirect: "/",
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({
      code: 400,
      success: false,
      message: "Failed to get users",
      result: { errors },
    });
  }
};

export const login_get = (req, res) => {
  console.log("login_get");
  res.render("login");
};

export const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password,
    });
    const token = createToken(user._id);
    console.log(token);
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Signed UP!",
      result: { user: user._id },
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({
      code: 400,
      success: false,
      message: "Failed to Login In",
      result: { errors },
    });
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Loged In!",
      result: { user: user._id },
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({
      code: 400,
      success: false,
      message: "Failed to Login In",
      result: { errors },
    });
  }
};

export const logout_get = async (req, res) => {
  try {
    const clearCookie = await res.cookie("access_token", "", { maxAge: 1 });
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Loged Out!",
      result: {},
      redirect: "/",
    });
  } catch {}
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Loged Out!",
      result: {
        services,
      },
      redirect: "/",
    });
  } catch {}
};

export const addService = async (req, res) => {
  const {
    Overview: { title },
  } = req.body;
  try {
    const service = await Service.create({ Overview: { title } });
    res.status(201).json({
      code: 201,
      success: true,
      message: "successfully Added!",
      result: { service: service._id },
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({
      code: 400,
      success: false,
      message: "Failed to Add the Service",
      result: { errors },
    });
  }
};
