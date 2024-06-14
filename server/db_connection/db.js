const mongoose = require("mongoose");

function db_connection(callback) {
  mongoose
    .connect(
        process.env.MONGO_URL,
    )
    .then(() => {
      return callback;
    })
    .catch((error) => {
      console.log("Mongo DB Error : ", error);
    });
}

module.exports = db_connection;