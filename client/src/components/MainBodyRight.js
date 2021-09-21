import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
class MainBodyRight extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="blog-right">
          <div className="trending-div blog-type-hastag-div">
            <h2 className="explore-text">Explore Blogs by Genre</h2>

            <Router>
              <a
                href="/blogs/type=history&page=1&limit=5"
                // onClick={this.props.renderCenter}
              >
                <div
                  className="image-text-genre flex-div align-center"
                  // onClick={() => this.handleBlogTypeClick("history")}
                >
                  <img
                    alt="genre-img"
                    className="genre-img"
                    src="https://images.pexels.com/photos/1172018/pexels-photo-1172018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  ></img>
                  <h2 className="genre-text">#HISTORY</h2>
                </div>
              </a>
            </Router>
            <a
              href="/blogs/type=design&page=1&limit=5"
              //   onClick={this.props.renderCenter}
            >
              <div
                className="image-text-genre flex-div align-center"
                //onClick={() => this.handleBlogTypeClick("design")}
              >
                <img
                  alt="genre-img"
                  className="genre-img"
                  src="https://images.pexels.com/photos/161043/stained-glass-colorful-glass-stained-glass-window-161043.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ></img>
                <h2 className="genre-text">#DESIGN</h2>
              </div>
            </a>

            <a
              href="/blogs/type=science&page=1&limit=5"
              //   onClick={this.props.renderCenter}
            >
              <div
                className="image-text-genre flex-div align-center"
                //onClick={() => this.handleBlogTypeClick("science")}
              >
                <img
                  alt="genre-img"
                  className="genre-img"
                  src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                ></img>
                <h2 className="genre-text">#SCIENCE</h2>
              </div>
            </a>

            <a
              href="/blogs/type=travel&page=1&limit=5"
              //   onClick={this.props.renderCenter}
            >
              <div
                className="image-text-genre flex-div align-center"
                //onClick={() => this.handleBlogTypeClick("travel")}
              >
                <img
                  alt="genre-img"
                  className="genre-img"
                  src="https://images.pexels.com/photos/3061217/pexels-photo-3061217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                ></img>
                <h2 className="genre-text">#TRAVEL</h2>
              </div>
            </a>
            <a
              href="/blogs/type=food&page=1&limit=5"
              //   onClick={this.props.renderCenter}
            >
              <div
                className="image-text-genre flex-div align-center"
                //onClick={() => this.handleBlogTypeClick("food")}
              >
                <img
                  alt="genre-img"
                  className="genre-img"
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                ></img>
                <h2 className="genre-text">#FOOD</h2>
              </div>
            </a>

            <a
              href="/blogs/type=anthropology&page=1&limit=5"
              //   onClick={this.props.renderCenter}
            >
              <div
                className="image-text-genre flex-div align-center"
                //onClick={() => this.handleBlogTypeClick("anthropology")}
              >
                <img
                  alt="genre-img"
                  className="genre-img"
                  src="https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                ></img>
                <h2 className="genre-text">#HUMAN-NATURE</h2>
              </div>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainBodyRight;
