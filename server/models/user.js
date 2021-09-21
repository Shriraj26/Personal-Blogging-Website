const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
	  required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
  },
  {
    //To get created at and updated at dates of the blogs by the user.
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
