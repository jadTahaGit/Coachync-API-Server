import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an Email'],
    minlength: [6, 'Minimum password length is a 6 charachtars'],
  },
});

// hash the password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// static Method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('users', userSchema);

export default User;
