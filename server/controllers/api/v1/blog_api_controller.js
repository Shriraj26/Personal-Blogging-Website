const Blog = require("../../../models/blog");
const GeneralUser = require("../../../models/generalUser");

//With pagination
module.exports.sendBlogs = (req, res) => {
  res.json(res.paginatedResults);
};

//get single blog through the blog id
module.exports.sendSingleBlog = async (req, res) => {
  console.log(req.params.slug);
  let result = {};
  try {
    result.result = await Blog.findOne({ slug: req.params.slug }).populate({
      path: "comments",
      populate: {
        path: "generalUser",
      },
    });

    console.log("Your Blog Found - ", result.result.title);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//get blogs with type provided
module.exports.sendParticularTypeOfBlogs = async (req, res) => {
  //Here we process params at the paginated side and we get the results accordingly
  console.log(req.params.type);

  res.json(res.paginatedResults);
};

//create a new blog and return it
module.exports.createBlog = async (req, res) => {
  console.log(req.body);

  try {
    const newblog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      desc: req.body.desc,
      author: req.body.author,
      img: req.body.img,
      type: req.body.type,
    });

    console.log("Created a blog through API");

    res.status(200).json(newblog);
  } catch (e) {
    console.log("Error creating a blog through API");
    res.status(500).json({
      message: "Error creating the blog - " + e.message,
    });
  }
};

//edit the blog and return the new blog
module.exports.editBlog = async (req, res) => {
  console.log(req.params.id);

  try {
    await Blog.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        desc: req.body.desc,
        img: req.body.img,
        type: req.body.type,
      }
    );

    console.log("edited a blog through API");

    let newblog = await Blog.findById({ _id: req.params.id });
    res.status(200).json(newblog);
  } catch (e) {
    console.log("Error editing a blog through API");
    res.status(500).json({
      message: "Error editing the blog - " + e.message,
    });
  }
};

//delete the blog with given id
module.exports.deleteBlog = async (req, res) => {
  console.log(req.params.id);

  let blog = await Blog.findById(req.params.id);

  try {
    blog.remove();

    res.status(200).json({ message: "Blog Deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
