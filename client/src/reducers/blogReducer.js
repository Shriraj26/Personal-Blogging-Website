import {
  ADD_BLOGS_TO_STORE,
  ADD_SINGLE_BLOG_TO_STORE,
  GET_COMMENTS,
  ADD_COMMENT_TO_STORE,
  ADD_SEARCH_TO_STORE,
  REMOVE_SEARCH,
  REMOVE_BLOGS_FROM_STORE,
  PUSH_SINGLE_COMMENT_TO_STORE,
} from "../actions/actionVariables";
const initialState = {
  blogsPagination: [],
  singleFullBlog: {},
  commentsOnSingleBlog: [],
  latestComment: {},
  searchResults: [],
  prev: null,
  next: null,
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BLOGS_TO_STORE:
      return {
        ...state,
        blogsPagination: action.blogsPagination,
        prev: action.prev,
        next: action.next,
      };

    case REMOVE_BLOGS_FROM_STORE:
      return {
        ...state,
        blogsPagination: action.blogsPagination,
      };

    case ADD_SINGLE_BLOG_TO_STORE:
      return {
        ...state,
        singleFullBlog: action.singleFullBlog,
      };

    case GET_COMMENTS:
      return {
        ...state,
        commentsOnSingleBlog: action.comments,
      };

    case PUSH_SINGLE_COMMENT_TO_STORE:
      return {
        ...state,
        commentsOnSingleBlog: [...state.commentsOnSingleBlog, action.comment],
      };

    case ADD_COMMENT_TO_STORE:
      let oldComments = JSON.parse(
        JSON.stringify(state.singleFullBlog.comments)
      );
      oldComments = oldComments.concat(action.comment);

      //let newState = JSON.parse(JSON.stringify(state));
      //let newSingleBlog = { ...newState.singleFullBlog };
      //newSingleBlog.comments.push(action.comment);

      //newState = { ...newState, singleFullBlog: newSingleBlog };
      return {
        ...state,
        singleFullBlog: {
          ...state.singleFullBlog,
          comments: oldComments,
        },
        latestComment: action.comment,
      };

    case ADD_SEARCH_TO_STORE:
      return {
        ...state,
        searchResults: action.results,
      };

    case REMOVE_SEARCH:
      return {
        ...state,
        searchResults: [],
      };
    default:
      return state;
  }
}
