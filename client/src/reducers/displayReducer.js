import { DISPLAY } from "../actions/actionVariables";

const initialState = {
  displayHome: true,
  displayBlog: false,
  displayBlogList: false,
  displayContact: false,
};

export default function displayReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY:
      return {
        ...state,
        displayHome: action.displayHome,
        displayBlog: action.displayBlog,
        displayBlogList: action.displayBlogList,
        displayContact: action.displayContact,
      };

    default:
      return state;
  }
}
