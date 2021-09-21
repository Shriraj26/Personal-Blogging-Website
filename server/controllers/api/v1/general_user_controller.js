const GeneralUser = require("../../../models/generalUser");
const Comment = require("../../../models/comments");
const User = require("../../../models/user");
const Blog = require("../../../models/blog");
const { findById } = require("../../../models/blog");

module.exports.createGeneralUser = async (req, res) => {
  console.log(req.body);
  console.log("In gen user");
  try {
    const newUser = await GeneralUser.create({
      name: req.body.name,
      email: req.body.email,
    });

    console.log("Created a general user through API");

    res.status(200).json(newUser);
  } catch (e) {
    console.log("Error creating a general user through API");
    res.status(500).json({
      message: "Error creating the general user - " + e.message,
    });
  }
};

module.exports.commentOnBlog = async (req, res) => {
  console.log(req.body);
  console.log("In gen user comment");
  let user;
  try {
    //first search the user in our DB
    user = await GeneralUser.findOne({ email: req.body.email });

    if (!user) {
      //create the user
      user = await GeneralUser.create({
        name: req.body.name,
        email: req.body.email,
      });
      console.log("Created a general user through API for a new Comment");
    }

    console.log(user);
    //now create the comment for him
    let newComment = await Comment.create({
      comment: req.body.comment,
      blog: req.body.blogID,
      generalUser: user.id,
    });
    console.log("created Comment");

    //push the comment to the blog
    let blog = await Blog.findOneAndUpdate(
      { _id: req.body.blogID },
      { $push: { comments: newComment } }
    );

    newComment = await Comment.findById(newComment._id).populate("generalUser");

    console.log("Created a new Comment - ", newComment);
    console.log("For this blog - ", blog);
    //console.log("This user created that - ", user);
    res.status(200).json(newComment);
  } catch (e) {
    console.log("Error creating a comment through API - ", e);
    res.status(500).json({
      message: "Error creating the comment - " + e.message,
    });
  }
};

module.exports.getComment = async (req, res) => {
  console.log(req.params);
  let comments = await Blog.findById(req.params.id, "comments").populate({
    path: "comments",
    populate: {
      path: "generalUser",
    },
  });

  //console.log(comments);
  const { inspect } = require("util");
  console.log(inspect(comments, { depth: null }));

  //res.status(200).json(newComment);

  //   try {
  //   } catch (e) {
  //     console.log("Error creating a comment through API - ", e);
  //     res.status(500).json({
  //       message: "Error creating the comment - " + e.message,
  //     });
  //   }
};
