import React, { Component } from "react";
import { connect } from "react-redux";
import { activateDisplay } from "../actions/displayAction";
import BlogCardMainPage from "./BlogCardMainPage";
import { fetchBlogs } from "../actions/blogActions";
import { Link } from "react-router-dom";

class CentreHome extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      blogs: [],
    };
  }

  componentDidMount() {
    //get the blogs first

    //handle the case where u have the blogs but your state does not have it so u have to set your
    //state again...
    //console.log("Length blogpagination ", this.props.blogsPagination.length);
    //if (this.props.blogsPagination.length === 0) {
    this.props.dispatch(fetchBlogs(1, 5));
    //}
  }

  componentDidUpdate() {
    //console.log("Compoenent updated");
    //console.log("The props in the CENTRE HOME After update- ", this.props);

    //set the state after getting the blogs
    if (this.props.blogsPagination.length > 0 && this.state.loading === true) {
      this.setState({
        blogs: this.props.blogsPagination,
        loading: false,
      });
    }
  }

  handleExploreMore = () => {
    this.props.dispatch(activateDisplay(false, false, true, false));
  };

  render() {
    const { getDate, next } = this.props;
    return (
      <React.Fragment>
        <div className="highlight-div">
          <h1 className="highlight-text">Today's Highlight</h1>
          <Link
            to={this.state.blogs[0] ? `/blog/${this.state.blogs[0].slug}` : "/"}
            key={this.state.blogs[0] ? this.state.blogs[0]._id : "001"}
          >
            <div className="highlight-main-desc flex-div row-div">
              {/* https://images.pexels.com/photos/4808279/pexels-photo-4808279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 */}
              {this.state.loading ? (
                <div className="loading-img-div"></div>
              ) : (
                <img
                  alt="highlight-img"
                  style={{ height: 200, width: 200 }}
                  src={this.state.blogs[0].img}
                  className="highlight-img"
                ></img>
              )}

              <div className="highlight-desc flex-div col-div">
                {this.state.loading ? (
                  <div className="highlight-title-type-div-loading">
                    <div className="highlight-title-type flex-div row-div justify-space-between">
                      <h1 className="highlight-title">Loading</h1>
                      <h3 className="highlight-title-type-desc">#TECHNOLOGY</h3>
                    </div>

                    <p
                      className="limit-lines limit-4-lines highlight-desc-p"
                      style={{ marginTop: 10 }}
                    >
                      Loading the text... PLease Wait...
                    </p>

                    <p
                      style={{ marginTop: 10 }}
                      className="highlight-desc-date"
                    >
                      Loading
                    </p>
                  </div>
                ) : (
                  <div className="">
                    <div className="highlight-title-type flex-div row-div justify-space-between">
                      <h1 className="highlight-title">
                        {this.state.blogs[0].title}
                      </h1>
                      <h3 className="highlight-title-type-desc">#TECHNOLOGY</h3>
                    </div>

                    <p
                      className="limit-lines limit-4-lines highlight-desc-p"
                      style={{ marginTop: 10 }}
                    >
                      {this.state.blogs[0].desc}
                    </p>

                    <p
                      style={{ marginTop: 10 }}
                      className="highlight-desc-date"
                    >
                      {getDate(this.state.blogs[0].createdAt)}
                    </p>
                  </div>
                )}

                {this.state.loading ? (
                  <div>
                    <div className="flex-div justify-space-between loading-readmore">
                      <h2 className="highlight-author">Loading</h2>
                      <p href="" className="highlight-read-more">
                        Read More...
                      </p>
                    </div>
                    <div
                      className="flex-div justify-space-between loading-readmore"
                      style={{ marginTop: "5px" }}
                    >
                      <h2 className="highlight-author">Loading</h2>
                      <p href="" className="highlight-read-more">
                        Read More...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-div justify-space-between">
                    <h2 className="highlight-author">
                      {this.state.loading
                        ? "Loading"
                        : `By - ${this.state.blogs[0].author}`}
                    </h2>
                    <p href="" className="highlight-read-more">
                      Read More...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>

          <div className="trending-div">
            <h2>Top Trending</h2>

            {this.state.loading && (
              <div className="trending-blogs-div flex-div row-div">
                <div className="trending-blog-img-loading"></div>
                <div className="trending-div-text flex-div col-div justify-space-between">
                  <div className="">
                    <div
                      className="flex-div justify-space-between"
                      style={{ backgroundColor: "#f8f8f8", color: "#f8f8f8" }}
                    >
                      <h4>Loading</h4>
                      <h4>#ARCHITECTURE</h4>
                    </div>
                    <div
                      style={{ backgroundColor: "#f8f8f8", color: "#f8f8f8" }}
                    >
                      <p className="limit-lines limit-2-lines trending-blog-desc-p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus sit amet tincidunt ex. Integer dictum porta
                        felis, nec blandit mi viverra nec. Morbi auctor leo quis
                        pellentesque pellentesque. Proin tincidunt nulla vitae
                        ullamcorper luctus. Curabitur neque nunc, vulputate sed
                        orci quis, condimentum posuere sapien. Vivamus a
                        malesuada dolor.pellentesque pellentesque. Proin
                        tincidunt nulla vitae ullamcorper luctus. Curabitur
                        neque nunc, vulputate sed orci quis,
                      </p>
                      <p className="trending-blog-desc-date">1 April 2021</p>
                    </div>
                  </div>

                  <div
                    className="flex-div justify-space-between"
                    style={{ backgroundColor: "#f8f8f8", color: "#f8f8f8" }}
                  >
                    <p className="">By - SkullCrusher</p>
                    <p>Read More...</p>
                  </div>
                </div>
              </div>
            )}

            {this.state.loading === false &&
              this.state.blogs.length > 0 &&
              this.state.blogs.map(
                (blog, index) =>
                  index > 0 && (
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
                  )
              )}

            {/* Trending Div Over */}
          </div>
        </div>

        {next !== null && (
          <div className="explore-more-div flex-div justify-flex-end">
            <a href="/blogs/page=2&limit=5">
              <h2>Explore More...</h2>
            </a>
          </div>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsPagination: state.blogs.blogsPagination,
    display: state.display,
    prev: state.blogs.prev,
    next: state.blogs.next,
  };
}

export default connect(mapStateToProps)(CentreHome);
