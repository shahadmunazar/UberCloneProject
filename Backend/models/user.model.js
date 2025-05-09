const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First Name must be at least 3 characters']
    },
    lastname: {
      type: String,
      required: false,
      minlength: [3, 'Last Name must be at least 3 characters']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters']
  },
  password: {
    type: String,
    required: true
  },
  socketId: {
    type: String,
    required: false,
    select: false
  }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};


userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};


userSchema.methods.hashPassword = async function (plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
};

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
