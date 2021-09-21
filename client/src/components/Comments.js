import React, { Component } from "react";
import { connect } from "react-redux";
import google from "../icons/google.png";
import { GoogleLogin } from "react-google-login";
import { postCommentToBlog, addCommentsToStore } from "../actions/blogActions";
import { authLogin } from "../actions/authAction";

class Comments extends Component {
  constructor() {
    super();

    this.state = {
      content: "",
      loading: true,
      comments: [],
      loadingComment: false,
    };
  }

  loginGoogleSuccess = async (response) => {
    //On success dispatch an action to save the user profile in the local storage and then set it to navbar as
    //well

    //console.log(response);
    //console.log(response?.profileObj);

    const result = response?.profileObj;
    //response?.profileObj?.name
    //response?.profileObj?.email
    /*email name - save this to our db*/
    //if server has same data then dont save, if no then update

    const token = response?.tokenId;

    try {
      this.props.dispatch(authLogin(result, token));
    } catch (err) {
      //console.log("Error dispatching the actioin of Google auth");
    }
  };

  loginGoogleFailure = (err) => {
    console.log("Google Error - ", err);
  };

  componentDidUpdate() {
    //console.log("Comment id is - ", this.props.singleFullBlog._id);
    //console.log("Component update - ", this.state);

    //if the comments come in props and not in the state, and loading is true, then update the state
    if (
      this.state.loading === false &&
      this.props.commentsOnSingleBlog.length === this.state.comments.length + 1
    ) {
      //consolelog("Neeeed tooooooo renderrrrrr");

      this.setState({
        comments: this.props.commentsOnSingleBlog,
        content: "",
        loadingComment: false,
      });
      //consolelog("Handle comment after loadingcomment - ", this.state);
    }

    //if single full blog has appeared, then add its comments to the comments store
    if (this.props.singleFullBlog?.title && this.state.loading === true) {
      this.props.dispatch(
        addCommentsToStore(this.props.singleFullBlog.comments)
      );

      this.setState({
        loading: false,
        comments: this.props.singleFullBlog.comments,
      });
    }
  }
  handleComment = async (userName, email, comment, blogID) => {
    ////consolelog("Clicked hheh");

    await this.setState({
      loadingComment: true,
    });
    // console.log(
    //   "Handle comment the loadingcomment - ",
    //   this.state.loadingComment
    // );
    if (userName && email && comment && blogID) {
      //console.log("Props before post comment to store", this.props);
      await this.props.dispatch(
        postCommentToBlog(userName, email, comment, blogID)
      );

      //await dispatch(pushSingleCommentToStore(data));
      //console.log("Props after post comment to store", this.props);
    }
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { auth, singleFullBlog } = this.props;
    const comments2 = this.props.blogs?.commentsOnSingleBlog;
    const { clientID } = this.props.auth;
    const { loading, comments, loadingComment } = this.state;
    //consolelog("Now waiting button is ", this.state.loadingComment);
    return (
      <div className="comments-div">
        <h1 className="comments-text">Comments</h1>

        <div className="comments-on-that-blog">
          {/* {comments &&
            comments.map((comment) => {
              return (
                <div className="comments-list" key={`comment-${comment._id}`}>
                  <p>{comment?.comment}</p>
                  <p>- {comment?.generalUser?.name}</p>
                </div>
              );
            })} */}

          {comments &&
            loading === false &&
            comments.map((comment) => {
              return (
                <div className="comments-list" key={`comment-${comment._id}`}>
                  <p>{comment?.comment}</p>
                  <p>- {comment?.generalUser?.name}</p>
                </div>
              );
            })}
        </div>
        {/*made changes here */}
        <form
          className="comments-form"
          // action={`/blog/${singleFullBlog.slug}`}
        >
          <input
            onChange={this.handleChange}
            className="comments-input"
            placeholder="Add your Comment Here!!!"
            value={this.state.content}
          ></input>
        </form>
        {auth.authData !== null ? (
          loadingComment === false ? (
            <button
              className="comment-submit-btn"
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.handleComment(
                  auth.authData.result.name,
                  auth.authData.result.email,
                  this.state.content,
                  singleFullBlog._id
                )
              }
            >
              Submit
            </button>
          ) : (
            <button
              className="comment-submit-btn"
              disabled={true}
              style={{ backgroundColor: "#79FD9B" }}
            >
              Loading...
            </button>
          )
        ) : (
          clientID && (
            <GoogleLogin
              clientId={clientID}
              buttonText="Login"
              onSuccess={this.loginGoogleSuccess}
              onFailure={this.loginGoogleFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              render={(renderProps) => (
                <button
                  type="submit"
                  className="btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <div className="flex-div row-div align-center">
                    <img
                      alt="google-logo"
                      className="google-logo"
                      src={google}
                    ></img>
                    <p className="btn-text"></p>Login with Google to Submit a
                    Comment
                  </div>
                </button>
              )}
            />
          )
        )}

        {/*
          <GoogleLogout
            clientId="914061969148-bjn7m8a3boufkulq1l7fte88ifehgjv9.apps.googleusercontent.com"
            buttonText="Login Out"
            onLogoutSuccess={this.logoutGoogleSuccess}
            render={(renderProps) => (
              <button
                className="btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <div className="flex-div row-div align-center">
                  <img className="google-logo" src={google}></img>
                  <p className="btn-text"></p>Logout
                </div>
              </button>
            )}
          /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleFullBlog: state.blogs.singleFullBlog,
    auth: state.auth,
    commentsOnSingleBlog: state.blogs.commentsOnSingleBlog,
    //when new comment gets added, subscribe to its changes as well
  };
}

export default connect(mapStateToProps)(Comments);
