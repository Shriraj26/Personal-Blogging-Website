const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
  {
    blog:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Blog'
	},
	generalUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'GeneralUser'
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

const Likes = mongoose.model("Likes", LikesSchema);

module.exports = Likes;
