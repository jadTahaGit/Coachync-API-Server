import JWT from 'jsonwebtoken';
import User from './../models/User.js';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  // check json web token exists & is verified
  if (token) {
    JWT.verify(token, 'FedJadPedKarAli2022', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
export const checkUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    JWT.verify(token, 'FedJadPedKarAli2022', async (err, decodedToken) => {
      if (err) {
        console.log('error verifying the token');
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log('no token');
    res.locals.user = null;
    next();
  }
};
