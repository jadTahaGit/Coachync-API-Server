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

// database connection
const dbURI =
  'mongodb+srv://jadtaha:8JlOTrtdfH1u@cluster0.imrf7.mongodb.net/node-auth?';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((result) => {
    console.log('DB connected Successfully');
    console.log('Listining on Server 4001');
    app.listen(process.env.PORT || 4001);
  })
  .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/jutsus', requireAuth, (req, res) => res.render('jutsus'));
// app.use(authRoutes);
