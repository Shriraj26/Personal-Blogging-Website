const Blog = require("../../../models/blog");
module.exports.search = async (req, res) => {
  console.log(req.params);

  //we have used the fuzzy search library to get the results and have limited it to only 5
  const result = await Blog.fuzzySearch(req.params.searchText).limit(5);

  //if u want to send only id, img, title and desc u can do it so and then return the result to the user
  console.log(result);

  res.status(200).json(result);
};
