const express = require("express");
const router = express.Router();
const genUserController = require("../../../controllers/api/v1/general_user_controller");

const passport = require("passport");

//create gen user if not present
router.post("/create", genUserController.createGeneralUser);

//create comment on blog
router.post("/comment", genUserController.commentOnBlog);

//get comments on the blog
router.get("/getcomment/:id", genUserController.getComment);

module.exports = router;
