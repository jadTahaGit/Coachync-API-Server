import User from '../models/User.js';
import JWT from 'jsonwebtoken';

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email:
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }
  // incorrect password:
  if (err.message === 'incorrect password') {
    errors.password = 'that password is  incorrect';
  }
  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
  }
  if (err.message.includes('users validation failed')) {
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
  return JWT.sign({ id }, 'FedJadPedKarAli2022', {
    expiresIn: maxAge,
  });
};

export const signup_get = (req, res) => {
  res.render('signup');
};

export const login_get = (req, res) => {
  console.log('login_get');
  res.render('login');
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
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

export const logout_get = (req, res) => {
  res.cookie('access_token', '', { maxAge: 1 });
  res.redirect('/');
};
