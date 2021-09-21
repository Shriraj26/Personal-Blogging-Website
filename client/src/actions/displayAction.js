import { DISPLAY } from "../actions/actionVariables";

export function activateDisplay(
  displayHome,
  displayBlog,
  displayBlogList,
  displayContact
) {
  return {
    type: DISPLAY,
    displayHome,
    displayBlog,
    displayBlogList,
    displayContact,
  };
}
