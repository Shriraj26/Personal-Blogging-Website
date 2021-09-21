const mongoose = require("mongoose");

const generalUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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

const GeneralUser = mongoose.model("GeneralUser", generalUserSchema);

module.exports = GeneralUser;
