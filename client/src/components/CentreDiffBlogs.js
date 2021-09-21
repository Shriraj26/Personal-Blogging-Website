import React, { Component } from "react";
import BlogCardMainPage from "./BlogCardMainPage";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBlogsWithType,
  fetchBlogs,
  removeBlogsFromStore,
} from "../actions/blogActions";

class CentreDiffBlogs extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      blogs: [],
      prev: null,
      next: null,
      currentParams: null,
    };
  }
  componentDidMount() {
    //console.log("Component mounted");
    //get the blogs first FROM props as props will have it

    //console.log(this.props.match);
    const type = this.props.match.params?.type;
    //console.log("if type - ", type);
    const page = this.props.match.params.page;
    const limit = this.props.match.params.limit;

    //console.log("The centre blog props ", this.props);

    //if type exists - dispatch the fetchBlogs with type
    if (type) {
      this.props.dispatch(fetchBlogsWithType(type, page, limit));
    } else {
      this.props.dispatch(fetchBlogs(page, limit));
    }
  }

  handleStateUpdate() {
    // //console.log(
    //   "Loading is = ",
    //   this.state.loading,
    //   "blog pagination - ",
    //   this.state.blogs
    // );
    if (this.props.blogsPagination.length > 0 && this.state.loading === true) {
      //console.log("props are - ", this.props);
      this.setState({
        blogs: this.props.blogsPagination,
        loading: false,
        prev: this.props.prev,
        next: this.props.next,
        type: this.props.match.params?.type,
        currentPage: this.props.match.params?.page,
        currentLimit: this.props.match.params?.limit,
      });
    }
  }

  handleNextPrev = async () => {
    const { type } = this.state;
    //console.log(this.props);

    var page, limit;
    if (this.state?.next) {
      page = this.state.next.page;
      limit = this.state.next.limit;
    } else if (this.state?.prev) {
      page = this.state.prev.page;
      limit = this.state.prev.limit;
    }

    //empty the store first
    await this.props.dispatch(removeBlogsFromStore());

    //empty our state too
    this.setState({
      loading: true,
      blogs: [],
    });

    if (type) {
      //fetch blogs with type and next data
      await this.props.dispatch(fetchBlogsWithType(type, page, limit));
    } else {
      //fetch blogs with only next data
      await this.props.dispatch(fetchBlogs(page, limit));
    }
  };

  componentDidUpdate() {
    //const type = this.props.match.params?.type;

    this.handleStateUpdate();
  }
  render() {
    const { prev, next, getDate } = this.props;
    const { blogs, loading, type } = this.state;
    //console.log("In Render state is -----------", this.state);
    return (
      <div>
        {blogs.length === 0 && <h1>Blogs on this topic Coming Soon</h1>}
        {loading === false &&
          blogs.length > 0 &&
          blogs.map((blog, index) => (
            <Link
              to={blog ? `/blog/${blog.slug}` : "/"}
              key={blog ? `${blog.slug}` : "003"}
            >
              <BlogCardMainPage
                blog={blog}
                getDate={getDate}
                handleExploreMore=""
              />
            </Link>
          ))}
        <div
          className={
            prev
              ? `flex-div row-div justify-space-between`
              : `flex-div row-div justify-flex-end`
          }
        >
          {prev && (
            <Link
              to={
                type
                  ? `/blogs/type=${type}&page=${prev.page}&limit=${prev.limit}`
                  : `/blogs/page=${prev.page}&limit=${prev.limit}`
              }
              onClick={this.handleNextPrev}
            >
              <div>
                <p>Prev</p>
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={
                type
                  ? `/blogs/type=${type}&page=${next.page}&limit=${next.limit}`
                  : `/blogs/page=${next.page}&limit=${next.limit}`
              }
              onClick={this.handleNextPrev}
            >
              <div>
                <p>Next</p>
              </div>
            </Link>
          )}

          {/* <Route
            exact={true}
            path={[
              "/blogs/type=:type&page=:page&limit=:limit",
              "/blogs/page=:page&limit=:limit",
            ]} //?page=:page&limit=:limit
            // "/blogs?type=:type&:page&limit=:limit",
            // ]} //?page=:page&limit=:limit
            render={(props) => {
              return (
                //   <h1>Hejejejej</h1>
                <CentreDiffBlogs
                  getDate={this.getDate}
                  handleBlogDivOnClick={this.handleBlogDivOnClick}
                  {...props}
                />
              );
            }}
          /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsPagination: state.blogs.blogsPagination,
    prev: state.blogs.prev,
    next: state.blogs.next,
  };
}

export default connect(mapStateToProps)(CentreDiffBlogs);
