const express = require("express");
const router = express.Router();
const blogAPIController = require("../../../controllers/api/v1/blog_api_controller");
const paginate = require("../../../middlewares/paginatedFunction");
const Blog = require("../../../models/blog");
const passport = require("passport");
//show all blogs - pagination - simple
router.get("/", paginate.paginate(Blog), blogAPIController.sendBlogs);

//show particular blog
router.get("/:slug", blogAPIController.sendSingleBlog);

//show 5 blogs with type provided
router.get(
  "/type/:type",
  paginate.paginate(Blog),
  blogAPIController.sendParticularTypeOfBlogs
);

//edit blog
router.put(
  "/editblog/:id",
  passport.authenticate("jwt", { session: false }),
  blogAPIController.editBlog
);

//delete blog
router.delete(
  "/deleteblog/:id",
  passport.authenticate("jwt", { session: false }),
  blogAPIController.deleteBlog
);

//add blog
router.post(
  "/createblog",
  passport.authenticate("jwt", { session: false }),
  blogAPIController.createBlog
);

module.exports = router;
