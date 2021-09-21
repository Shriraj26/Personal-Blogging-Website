const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    generalUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralUser",
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

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;
