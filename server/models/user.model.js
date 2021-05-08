const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  changepassword: {type: Boolean}
});

module.exports = mongoose.model('user', userModel);