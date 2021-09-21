const Blog = require("../models/blog");

//Show All Blogs on one page
module.exports.showBlogs = (req, res) => {
  return res.render("showAllBlogs", { title: "Show Blogs from here" });
};

//Display new blog page
module.exports.newBlog = (req, res) => {
  return res.render("newBlog", { blog: new Blog() });
};

//handle new blog form
module.exports.handleNewBlogEntry = async (req, res) => {
  console.log(req.body);
  let blog = new Blog();

  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.content = req.body.content;
  blog.desc = req.body.desc;
  blog.type = req.body.type;
  blog.img = req.body.img;

  try {
    blog = await blog.save();
    console.log("Blog saved Successfully!!!");
    res.redirect(`/blogs/viewBlog/${blog._id}`);
  } catch (e) {
    console.log("Could not save new blog");
    console.log(e);
    res.render("newBlog", { blog: new Blog() });
  }
};

//Edit Blogs ---------------------------------------------------------------------------------------
//DISPLAY edit blog PAGE
module.exports.editBlogs = async (req, res) => {
  try {
    //Find the blog through params
    const blog = await Blog.findById({ _id: req.params.id });

    console.log("Found the blog to edit - ", blog);
    res.render("editBlog", { blog: blog });
  } catch (err) {
    console.log("cant find the blog u want to edit - ", err);
  }
};

//save edited blog
module.exports.saveBlog = async (req, res) => {
  // console.log(req.params.id)
  //get the form data through
  console.log("edit condofdg");
  console.log(req.body);
  let id = req.body._id;
  //save the form
  try {
    req.blog = await Blog.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        author: req.body.author,
        desc: req.body.desc,
        type: req.body.type,
        content: req.body.content,
        img: req.body.img,
      }
    );

    console.log("Saved edited blog");
    res.redirect(`/blogs/viewBlog/${req.body._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/blogs/editBlog/${id}`);
  }
};
//---------------------------------------------------------------------------------------------

//DISPLAY view Blog PAGE
module.exports.viewBlog = async (req, res) => {
  console.log(req.params);
  try {
    const blog = await Blog.findById({ _id: req.params.id });

    console.log(blog);
    console.log("Blog Found!!");
    res.render("viewBlog", { blog });
  } catch (err) {
    if (err) {
      console.log("Could not find your blog!!! - ", err);
    }
  }
};
//--------------------------------------------------------------------------------------------

//View All Blogs-----------------------------------------------------------------------------
module.exports.allBlogs = async (req, res) => {
  let isAuthenticated = false;
  //get latest blogs -- we will implement pagination afterwards
  try {
    let latestBlogs = await Blog.find().sort({
      createdAt: -1,
    });

    latestBlogs.forEach((blog) => {
      console.log(blog.title);
    });

    if (req.isAuthenticated()) {
      console.log("User is authenticated");
      isAuthenticated = true;
    }
    console.log("In Show All Blogs - ");

    res.render("showAllBlogs", { latestBlogs, isAuthenticated });
  } catch (err) {
    console.log("Cannot find the Blogs - ", err);
  }
};
