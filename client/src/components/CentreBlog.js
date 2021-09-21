import { connect } from "react-redux";
import React, { Component } from "react";
import { fetchSingleBlog, postCommentToBlog } from "../actions/blogActions";
import createDOMPurify from "dompurify";
import "../SingleBlogPage.css";
import ShareComponent from "./ShareComponent";
import Comments from "./Comments";
import Favicon from "react-favicon";
import bookLogo from "../icons/bookLogo.png";

class CentreBlog extends Component {
  constructor() {
    super();
    this.state = {
      singleFullBlog: {},
      loading: true,
      content: "",
    };
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;

    //console.log("The centre blog props ", this.props);
    //check if it exists in the singlefull blog
    if (this.props.singleFullBlog.length === 0) {
      if (slug === this.props.singleFullBlog.slug) {
        //console.log("Exists in the single Blog, use it");
        this.setState({
          singleFullBlog: this.props.singleFullBlog,
          loading: false,
        });
        return;
      }
    } else {
      //console.log("No blogs in store, so getting it");
      this.props.dispatch(fetchSingleBlog(slug, null));
      if (this.state.loading === false) {
        this.setState({
          loading: true,
        });
      }
      //get comments on the blog
      //}
    }
  }

  componentDidUpdate() {
    //U have subscribed to the store using connect method, so when the singleFullBlog of the
    //store gets updated with new valee, componentDidUpdate gets called and then u get to see the data
    //console.log("Component update - ", this.props, "State is - ", this.state);
    //Check if empty object does not exist
    if (this.props.singleFullBlog?.title && this.state.loading === true) {
      //console.log('Here no single blog still updating')
      this.setState({
        singleFullBlog: this.props.singleFullBlog,
        loading: false,
      });
    }
  }

  handleComment = (userName, email, comment, blogID) => {
    //console.log("Clicked hheh");

    if (userName && email && comment && blogID) {
      //console.log("Props before post comment to store", this.props);
      this.props.dispatch(postCommentToBlog(userName, email, comment, blogID));
      //console.log("Props after post comment to store", this.props);
    }
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    //console.log("The blog at center Blog - ", this.state.singleFullBlog);
    const { singleFullBlog, loading } = this.state;
    // console.log("Loading is - ", loading);
    const { comments } = this.state.singleFullBlog;
    //console.log("single full blog iss ", singleFullBlog);
    const { auth } = this.props;
    const { clientID } = this.props.auth;
    //console.log("render centre blog - clientID ", clientID);

    return (
      <div>
        <Favicon url={loading ? bookLogo : singleFullBlog?.img} />
        <div className="flex-div row div justify-space-between center-blog-div">
          <div className="center-blog-title-div">
            {loading ? (
              <h1 className="blog-title">Loading...</h1>
            ) : (
              <h1 className="blog-title">{singleFullBlog.title}</h1>
            )}
            {!loading && (
              <h3 className="blog-author">
                Written By - {singleFullBlog.author}
              </h3>
            )}

            {!loading && (
              <h3 className="blog-date">
                {this.props.getDate(singleFullBlog.createdAt)}
              </h3>
            )}

            {!loading && (
              <h3 className="capital blog-type">#{singleFullBlog.type}</h3>
            )}
          </div>
          {loading ? (
            <div className="loading-main-blog-img"></div>
          ) : (
            <img
              alt="blog-main-img"
              className="blog-main-img"
              src={singleFullBlog.img}
            ></img>
          )}
        </div>

        <div
          className="blog-content-style"
          dangerouslySetInnerHTML={{
            __html: createDOMPurify.sanitize(singleFullBlog.content),
          }}
        />

        <ShareComponent singleFullBlog={singleFullBlog} />

        <Comments
          comments={comments}
          singleFullBlog={singleFullBlog}
          clientID={clientID}
          auth={auth}
        />
      </div>
    );
    //parse(singleFullBlog.content);
  }
}

function mapStateToProps(state) {
  return {
    blogsPagination: state.blogs.blogsPagination,
    singleFullBlog: state.blogs.singleFullBlog,
    auth: state.auth,
    latestComment: state.blogs.latestComment,

    //when new comment gets added, subscribe to its changes as well
  };
}

export default connect(mapStateToProps)(CentreBlog);
