const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type:String,
    required: true,
  },
  state: {
   type:String,
    required: true,
  },

  city: {
    type:String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    },
  age : {
    type: Number,
    required: true,
    },


});


const User = mongoose.model('User', UserSchema);

module.exports = User;
