const mongoose = require('mongoose');

function connectToDb() {
  mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.error("DB Connection Error:", err);
    });
}

module.exports = connectToDb;
