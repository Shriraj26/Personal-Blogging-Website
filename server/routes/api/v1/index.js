const express = require("express");
const router = express.Router();

// router.get('/' , blogAPIController.blogAPIController);

//handle blogs
router.use("/blogs", require("./blogRoute"));

//handle users
router.use("/users", require("./userRoute"));

//handle search
router.use("/search", require("./searchRoute"));

//handle general user
router.use("/genUser", require("./generalUserRoute"));

module.exports = router;
