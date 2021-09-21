import React from "react";

function BlogCardMainPage(props) {
  const { blog, getDate } = props;

  return (
    <div
      className="trending-blogs-div flex-div row-div"
      //   onClick={() => handleBlogDivOnClick(blog._id)}
    >
      <div className="main-img-div">
        <img alt="main-img" className="trending-blog-img" src={blog.img} />
      </div>
      <div className="trending-div-text flex-div col-div justify-space-between">
        <div className="">
          <div className="flex-div justify-space-between">
            <h4 className="blog-card-title">{blog.title}</h4>
            <h4 className="blog-card-type">#{blog.type}</h4>
          </div>
          <div>
            <p className="limit-lines limit-2-lines trending-blog-desc-p">
              {blog.desc}
            </p>
            <p className="trending-blog-desc-date">{getDate(blog.createdAt)}</p>
          </div>
        </div>

        <div className="flex-div justify-space-between">
          <p className="blog-card-author">By - {blog.author}</p>
          <p className="read-more">Read More...</p>
        </div>
      </div>
    </div>
  );
}

export default BlogCardMainPage;
