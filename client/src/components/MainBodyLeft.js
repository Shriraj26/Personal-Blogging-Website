import React from "react";

function MainBodyLeft(props) {
  return (
    <div className="blog-left">
      <div className="trending-div">
        <h2 className="about-us-text">About Us</h2>
        <div className="about-us-main-div">
          <div className="about-us-div flex-div row-div">
            <img
              alt="main-img"
              className="about-us-img"
              src="https://drive.google.com/thumbnail?id=1km2yQz_Fffr3ne5ayipFUonWeFLwFHBc"
            />
            <div className="about-us-desc flex-div col-div justify-center">
              <p className="blog-admin-name">Shriraj Jahagirdar</p>
              <p className="blog-admin-role">Blog Developer</p>
              <p className="blog-admin-tagline">A poet who codes</p>
            </div>
          </div>
        </div>

        <div className="about-us-main-div">
          <div className="about-us-div flex-div row-div">
            <img
              alt="main-img"
              className="about-us-img"
              src="https://images.pexels.com/photos/7538666/pexels-photo-7538666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
            <div className="about-us-desc">
              <p className="blog-admin-name">Tommy</p>
              <p className="blog-admin-role">Cute Dog</p>
              <p className="blog-admin-tagline">
                A dog who needs constant attention
              </p>
            </div>
          </div>
        </div>

        <div className="about-us-main-div">
          <div className="about-us-div flex-div row-div">
            <img
              alt="main-img"
              className="about-us-img"
              src="https://images.pexels.com/photos/6441460/pexels-photo-6441460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <div className="about-us-desc">
              <p className="blog-admin-name">Furry</p>
              <p className="blog-admin-role">Lovely Cat</p>
              <p className="blog-admin-tagline">
                A highly pampered cat who feeds on milk
              </p>
            </div>
          </div>
        </div>

        <div className="ads-div-main">
          <p style={{ textAlign: "center" }}>Ads</p>
        </div>
      </div>
    </div>
  );
}

export default MainBodyLeft;
