import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  // user_id:{}
  Overview: {
    title: {
      type: String,
      required: [true, 'Please enter a Title'],
    },
    username: {},
    coachLevel: {
      // called level in User.js
    },

    starsforservice: {
      type: Number,
    },

    media: {
      // should be Links
      type: String,
    },
  },
  Description: {},
  AboutTheSeller: {},
  FAQ: {},
  Reviews: {},
});

const Service = mongoose.model('services', serviceSchema);

export default Service;
