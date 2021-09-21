import "../MainBody.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleBlog } from "../actions/blogActions";
import MainBodyLeft from "./MainBodyLeft";
import MainBodyCenter from "./MainBodyCenter";
import MainBodyRight from "./MainBodyRight";

function MainBody2(props) {
  //   decideResolution = () => {
  //     this.setState({
  //       isDesktop: window.screen.width > 1200,
  //       isMobile: window.screen.width < 480,
  //       isTablet: window.screen.width > 480,
  //     });
  //   };
}

class MainBody extends Component {
  constructor() {
    super();
    this.state = {
      isDesktop: false,
      isTablet: false,
      isMobile: false,
    };
  }

  decideResolution = () => {
    this.setState({
      isDesktop: window.screen.width > 1200,
      isMobile: window.screen.width < 480,
      isTablet: window.screen.width > 480,
    });
  };
  componentDidMount() {
    this.decideResolution();
    window.addEventListener("resize", this.decideResolution);
  }

  componentDidUpdate() {
    //console.log(this.state);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.decideResolution);
  }

  handleBlogDivOnClick = (id) => {
    let blogsToCheck = this.props.blogsPagination;

    //check if that blog exists in blogPagination
    blogsToCheck.forEach((blog) => {
      if (id === blog._id) {
        this.props.dispatch(fetchSingleBlog(blog._id, blog));
      } else {
        //test this as we have not implemented it yet
        this.props.dispatch(fetchSingleBlog(id, null));
      }
    });
  };

  render() {
    const { isDesktop, isTablet } = this.state;
    return (
      <div className="main-blog-content flex-div row-div">
        {isDesktop && <MainBodyLeft />}

        <MainBodyCenter />
        {isTablet && <MainBodyRight dispatch={this.props.dispatch} />}

        {/* <div className="blog-container"></div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MainBody);
