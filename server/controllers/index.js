module.exports.index = (req, res) => {
  return res.render("home", { title: "Home Page" });
};
