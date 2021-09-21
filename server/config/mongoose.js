//require the library
const mongoose = require("mongoose");

//Connect to the DB

const uri =
  process.ENV.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

//acquire the connection
var db = mongoose.connection;

//error checking
db.on("error", console.error.bind(console, "Error connecting to the DB bro"));

//test successfull connection
db.once("open", function () {
  // we're connected!
  console.log("Oh Yeah successfully connected to the DB!!");
});

module.exports = db;
