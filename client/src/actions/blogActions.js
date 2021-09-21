import { API_URLS } from "../helpers/urls";
import {
  ADD_BLOGS_TO_STORE,
  ADD_SINGLE_BLOG_TO_STORE,
  GET_COMMENTS,
  ADD_COMMENT_TO_STORE,
  ADD_SEARCH_TO_STORE,
  REMOVE_SEARCH,
  REMOVE_BLOGS_FROM_STORE,
  PUSH_SINGLE_COMMENT_TO_STORE,
} from "./actionVariables";

//Fetch the blogs from the server api
export function fetchBlogs(page, limit) {
  return (dispatch) => {
    const url = API_URLS.getBlogWithPagination(page, limit);

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Added blogs result its - -", data);

        dispatch(addBlogsToStore(data.results, data?.previous, data?.next));
      });
  };
}

export function fetchSingleBlog(slug, gotBlog) {
  return (dispatch) => {
    if (gotBlog) {
      dispatch(addSingleBlogToStore(gotBlog));
      return;
    }

    //console.log("called fetch single blog with id - ", id);
    const url = API_URLS.getSingleBlogWithID(slug);

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Got the result for single fetch- ", data);
        dispatch(addSingleBlogToStore(data.result));
      });
  };
}

//fetch the blogs with type
export function fetchBlogsWithType(type, page, limit) {
  return (dispatch) => {
    //console.log("page is - ", page, "limit is - ", "type is - ", type);
    const url = API_URLS.getBlogWithTypeAndPagination(page, limit, type);

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Added this blogs to store - type - ", data.results);
        dispatch(addBlogsToStore(data.results, data?.previous, data?.next));
      });
  };
}

//add the blogs to the store
export function addBlogsToStore(blogsPagination, prev = null, next = null) {
  //console.log("Prev is - ", prev, " next is - ", next);
  return {
    type: ADD_BLOGS_TO_STORE,
    blogsPagination: blogsPagination,
    prev: prev,
    next: next,
  };
}

export function removeBlogsFromStore() {
  return {
    type: REMOVE_BLOGS_FROM_STORE,
    blogsPagination: [],
  };
}

export function addSingleBlogToStore(blog) {
  return {
    type: ADD_SINGLE_BLOG_TO_STORE,
    singleFullBlog: blog,
  };
}

//get Comments on the blog -
export function getCommentsOnBlog(id) {
  //console.log("iidd iss ", id);
  return (dispatch) => {
    const url = API_URLS.getComments(id);
    //console.log("URL iss ", url);
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Got the Commentsssss - ", data);
        dispatch(addCommentsToStore(data.comments));
      });
  };
}

export function addCommentsToStore(data) {
  return {
    type: GET_COMMENTS,
    comments: data,
  };
}

export function postCommentToBlog(userName, email, comment, blogID) {
  return (dispatch) => {
    const url = API_URLS.createComment();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: email,
        comment: comment,
        blogID: blogID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Posted Comment ", data);
        dispatch(addSingleCommentsToStore(data));
        //console.log("Added comments - ", data);

        dispatch(pushSingleCommentToStore(data));
      });
  };
}

export function pushSingleCommentToStore(data) {
  return {
    type: PUSH_SINGLE_COMMENT_TO_STORE,
    comment: data,
  };
}

export function addSingleCommentsToStore(data) {
  return {
    type: ADD_COMMENT_TO_STORE,
    comment: data,
  };
}

//SEARCH A BLOG
export function searchBlog(text) {
  return (dispatch) => {
    let str = text.replace(/\s+/g, "%20");

    //console.log(str);
    const url = API_URLS.searchBlogs(str);

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); //searchResults
        dispatch(addSearchToStore(data));
      });

    //search text
    //# GET http://localhost:8000/api/v1/search/Latest%20Latest%20Blogg HTTP/1.1
  };
}

export function addSearchToStore(results) {
  return {
    type: ADD_SEARCH_TO_STORE,
    results,
  };
}

export function removeSearchFromStore() {
  return {
    type: REMOVE_SEARCH,
  };
}
