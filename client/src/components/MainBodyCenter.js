import React, { Component } from "react";
import { connect } from "react-redux";
import { activateDisplay } from "../actions/displayAction";
import { fetchSingleBlog } from "../actions/blogActions";
import CentreHome from "../components/CentreHome";
import CentreDiffBlogs from "./CentreDiffBlogs";
import CentreBlog from "../components/CentreBlog";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getClientID } from "../helpers/urls";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-197035357-1";

class MainBodyCenter extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      clientID: "",
    };
  }

  componentDidMount() {
    this.setState({
      clientID: getClientID(),
    });

    ReactGA.initialize(TRACKING_ID);
    console.log(
      "tHE rEACT PAGE VIEW CALLED ",
      window.location.pathname + window.location.search
    );
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidUpdate() {
    if (this.props && this.state.loading === true) {
      this.setState({
        blogs: this.props.blogsPagination,
        loading: false,
      });
    }
    console.log("Component Updated - ", window.location.pathname);
  }

  //pass it the centre home as props
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

    //then do display = blog
    //this.props.dispatch(activateDisplay(false, true, false, false));
  };

  handleExploreMore = () => {
    this.props.dispatch(activateDisplay(false, false, true, false));
  };

  getDate = (createdAt) => {
    var date = new Date(createdAt);
    var d = date.getUTCDate();
    var m = date.getUTCMonth();
    var y = date.getUTCFullYear();

    return d + " " + this.state.monthNames[m] + " " + y;
  };

  render() {
    //const { display } = this.props;
    //console.log("This state get client id - ", this.state.clientID);
    return (
      <Router>
        <div className="blog-center">
          {/* Everyting will span here so u have to take decision based on what is current display */}
          <Switch>
            <Route
              exact={true}
              path="/"
              render={(props) => {
                return (
                  <CentreHome
                    getDate={this.getDate}
                    handleBlogDivOnClick={this.handleBlogDivOnClick}
                    {...props}
                  />
                );
              }}
            />

            <Route
              exact={true}
              path="/blog/:slug"
              render={(props) => {
                return (
                  <CentreBlog
                    getDate={this.getDate}
                    {...props}
                    blogsPagination={this.props.blogsPagination}
                    singleFullBlog={this.singleFullBlog}
                  />
                );
              }}
            />

            <Route
              exact={true}
              path={[
                "/blogs/type=:type&page=:page&limit=:limit",
                "/blogs/page=:page&limit=:limit",
              ]}
              render={(props) => {
                return (
                  <CentreDiffBlogs
                    getDate={this.getDate}
                    handleBlogDivOnClick={this.handleBlogDivOnClick}
                    {...props}
                  />
                );
              }}
            />
          </Switch>

          {/* <Route path="/blog" component={CentreHome} /> */}
          {/* If display blog then -  */}
          {/* {display.displayBlog && true}
          {display.displayHome && (
            <CentreHome
              handleBlogDivOnClick={this.handleBlogDivOnClick}
              getDate={this.getDate}
            />
          )}
          {display.displayContact && true}
          {display.displayBlogList && true} */}
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    blogsPagination: state.blogs.blogsPagination,
    display: state.display,
  };
}

export default connect(mapStateToProps)(MainBodyCenter);
