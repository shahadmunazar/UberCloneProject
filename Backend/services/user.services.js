const UserModel = require('../models/user.model');

module.exports.createUser = async ({ fullname, email, password }) => {
  // ✅ Correct check using nested fullname
  if (!fullname || !fullname.firstname || !email || !password) {
    throw new Error('All fields are required');
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const user = await UserModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname
    },
    email,
    password
  });

  return user;
};
