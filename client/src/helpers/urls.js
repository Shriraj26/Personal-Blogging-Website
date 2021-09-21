const API_root = `https://blog-heroku-backend.herokuapp.com/api/v1`;
const clientID = `372434750573-lbg96090ctq0k80pe33muknoe25kp9k6.apps.googleusercontent.com`;

export const API_URLS = {
  createBlog: () => `${API_root}/blogs/createblog`,
  editBlog: (id) => `${API_root}/blogs/editBlog/${id}`,
  deleteBlog: (id) => `${API_root}/blogs/deleteblog/${id}`,
  getBlogWithPagination: (page, limit) =>
    `${API_root}/blogs?page=${page}&limit=${limit}`,
  getSingleBlogWithID: (slug) => `${API_root}/blogs/${slug}`,
  searchBlogs: (searchText) => `${API_root}/search/${searchText}`,
  getBlogWithTypeAndPagination: (page, limit, blog_type) =>
    `${API_root}/blogs/type/${blog_type}?page=${page}&limit=${limit}`,

  getComments: (blogid) => `${API_root}/genUser/getcomment/${blogid}`,

  createComment: () => `${API_root}/genUser/comment`,
};

export const getClientID = () => clientID;
