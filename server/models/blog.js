const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes",
      },
    ],
  },
  {
    //To get created at and updated at dates of the blogs by the user.
    timestamps: true,
  }
);

blogSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });

blogSchema.pre("validate", function (next) {
  console.log("Slug Heree");
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true, //convert the uppertext of title to lowertext
      strict: true, //get rid of any chars that dont fit into the URL for ex - ; ' / will be removed
    });
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
