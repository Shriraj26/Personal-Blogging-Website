import React, { Component } from "react";
import "../Navbar.css";
import { connect } from "react-redux";
import home from "../icons/house.png";
import user from "../icons/user.png";
import contact from "../icons/contact.png";
import google from "../icons/google.png";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { authLogin, authLogout } from "../actions/authAction";
import { searchBlog } from "../actions/blogActions";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      userProfile: null,
      userImg: "",
      loading: true,
      showLoginLogout: false,
      searchResults: [],
      showSearch: false,
    };
  }

  handleBodyClick = () => {
    this.setState({
      showLoginLogout: false,
      showSearch: false,
    });
  };
  componentDidMount() {
    //const myLocalStorage = localStorage.getItem("generalUserProfile");
    let user = JSON.parse(localStorage.getItem("generalUserProfile"));
    //console.log('In Navbar - user is - ', user?.result);
    //console.log('In Navbar - user token is - ', user?.token);

    if (user?.result && user?.token) {
      //console.log('Dispatching action for auth')
      this.props.dispatch(authLogin(user?.result, user?.token));
    }

    if (user?.result?.imageUrl) {
      //this.props.dispatch(authLogin(result, token));
      //console.log('image url exists - ',user?.result?.imageUrl);
      this.setState({
        userImg: user?.result?.imageUrl,
      });
    }

    //console.log(localStorage.getItem("generalUserProfile"));
    document.body.addEventListener("click", this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleBodyClick);
  }

  componentDidUpdate() {
    let user;

    //console.log("UPdate nvbar props - ", this.props);
    //console.log("UPdate nvbar state - ", this.state);
    //If the user has logged out
    if (this.props.auth.authData === null && this.state.loading === false) {
      //console.log('Setting the authdata null and loading is false');
      this.setState({
        userProfile: null,
        userImg: "",
        loading: true,
      });
      return;
    } else if (this.props.auth.authData?.result && this.state.loading) {
      //console.log('Auth data exists and loading is true');
      //get the cookie that we set
      user = JSON.parse(localStorage.getItem("generalUserProfile"));

      this.setState({
        userProfile: user.result,
        userImg: user.result.imageUrl,
        loading: false,
        content: "",
      });
    }
  }
  toggleSearch = (e) => {
    e.stopPropagation();
    //console.log("Here");
    this.setState((prevstate) => {
      return {
        ...prevstate,
        showSearch: !prevstate.showSearch,
      };
    });
  };

  toggleActive = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    //console.log("Here");
    this.setState((prevstate) => {
      return {
        ...prevstate,
        showLoginLogout: !prevstate.showLoginLogout,
      };
    });
  };
  loginGoogleSuccess = async (response) => {
    //On success dispatch an action to save the user profile in the local storage and then set it to navbar as
    //well

    //console.log(response);
    //console.log(response?.profileObj);
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      this.props.dispatch(authLogin(result, token));
    } catch (err) {
      //console.log("Error dispatching the actioin of Google auth");
    }
  };

  loginGoogleFailure = (err) => {
    console.log("Google Err- ", err);
  };

  logoutGoogleSuccess = async (response) => {
    this.props.dispatch(authLogout());
  };
  logoutGoogleFailure = async (err) => {
    console.log("Failure to logout - ", err);
  };

  handleSearch = (e) => {
    e.stopPropagation();
    this.setState({
      showSearch: true,
    });

    //this.state.showSearch = true;
    if (this.state.content !== "") {
      this.props.dispatch(searchBlog(this.state.content));
      this.setState({
        showSearch: true,
      });
      //console.log(this.state.showSearch);
    }
  };
  handleChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      content: e.target.value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (this.state.content !== "") {
        //console.log("Handle Searchhh");
        this.handleSearch(e);
      }
    }
  };
  render() {
    const { loading, userImg, userProfile, showLoginLogout, showSearch } =
      this.state;
    const { searchResults } = this.props;
    return (
      <div className="navbar flex-div row-div align-center">
        <div className="logo-div">
          <a href="/">
            <h1 className="logo-font">Blog it !</h1>
          </a>
        </div>

        <div className="input-container-div align-center flex-div col-div">
          <div className="input-container">
            <a className="pointer" id="left" onClick={this.handleSearch}>
              <i className="fas fa-search img-size"></i>
            </a>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              className="search-input"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div className="search-results">
            <ul className={showSearch ? "search-ul" : "search-ul disabled"}>
              {searchResults.map((searchData) => {
                return (
                  <a
                    href={`/blog/${searchData.slug}`}
                    key={`search-${searchData.slug}`}
                  >
                    <li className="search-li">
                      <div className="flex-div row-div search-results-box">
                        <img
                          alt="main-img"
                          className="search-img"
                          src={searchData.img}
                        />
                        <div className="flex-div col-div justify-center search-result-text">
                          <h3>{searchData.title}</h3>
                          <p>By - {searchData.author}</p>
                          <p>15 Aug 2021</p>
                        </div>
                      </div>
                    </li>
                  </a>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex-div row-div navbar-icons-div justify-flex-end">
          <a href="/" className="navbar-home-link">
            <img alt="main-img" className="navbar-imgs" src={home}></img>
          </a>
          <div href="" className="navbar-home-link" onClick={this.toggleActive}>
            {loading ? (
              <img alt="main-img" className="navbar-imgs" src={user}></img>
            ) : (
              <img
                alt="main-img"
                className="navbar-imgs navbar-user-img"
                src={userImg}
              ></img>
            )}

            {showLoginLogout && (
              <div className="login-div">
                {userProfile ? (
                  <GoogleLogout
                    clientId={this.props.auth.clientID}
                    buttonText="Login Out"
                    onLogoutSuccess={this.logoutGoogleSuccess}
                    render={(renderProps) => (
                      <button
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
                          <p className="btn-text"></p>Logout
                        </div>
                      </button>
                    )}
                  />
                ) : (
                  <GoogleLogin
                    clientId={this.props.auth.clientID}
                    buttonText="Login"
                    onSuccess={this.loginGoogleSuccess}
                    onFailure={this.loginGoogleFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                    render={(renderProps) => (
                      <button
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
                          <p className="btn-text"></p>Login
                        </div>
                      </button>
                    )}
                  />
                )}
              </div>
            )}
          </div>
          <a className="navbar-home-link" id="contact-link">
            <img alt="main-img" className="navbar-imgs" src={contact}></img>
          </a>
        </div>

        {/* <div>
            Icons made by{" "}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div> */}
        {/* <div>Icons made by <a href="" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    searchResults: state.blogs.searchResults,
  };
}

export default connect(mapStateToProps)(Navbar);
