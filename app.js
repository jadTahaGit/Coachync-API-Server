import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import { requireAuth, checkUser } from './middleware/authMiddleware.js';
import 'dotenv/config';

// use express
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.ATLAS_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((result) => {
    console.log('DB connected Successfully');
    console.log(`Listining on Server ${process.env.PORT}`);
    app.listen(process.env.PORT || 3001);
  })
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.send('Welcome To Coachync API'));
app.get('/api/profile', requireAuth, (req, res) =>
  res.send('Here are the posts')
);
app.use(authRoutes);
