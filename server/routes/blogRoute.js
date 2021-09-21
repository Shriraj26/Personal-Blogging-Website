const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.showBlogs);
router.post("/createBlog", blogController.handleNewBlogEntry);
router.get("/viewBlog/:id", blogController.viewBlog);
router.get("/new", blogController.newBlog);

//display edit blog page
router.get("/editBlog/:id", blogController.editBlogs);
//edit the blog
router.post("/saveEditedBlog", blogController.saveBlog); 

//get latest blogs
router.get('/allBlogs', blogController.allBlogs);

module.exports = router;
