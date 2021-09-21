import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

function ShareComponent(props) {
  //console.log(props);
  const { singleFullBlog } = props;
  return (
    <div className="share-icons-div">
      <h1 className="comments-text">Share this blog!!</h1>

      <div style={{ marginTop: "16px" }}>
        <EmailShareButton
          subject={singleFullBlog.title}
          body={`Check out this amazing blog by author ${singleFullBlog.author} by visiting this link - `}
          url={String(window.location)}
          separator={`\n`}
        >
          <EmailIcon
            className="share-icons"
            size={35}
            round={"true"}
          ></EmailIcon>
        </EmailShareButton>

        <FacebookShareButton
          quote={singleFullBlog.title}
          url={String(window.location)}
        >
          <FacebookIcon
            className="share-icons"
            size={35}
            round={"true"}
          ></FacebookIcon>
        </FacebookShareButton>

        <TwitterShareButton
          title={singleFullBlog.title}
          url={String(window.location)}
        >
          <TwitterIcon
            className="share-icons"
            size={35}
            round={"true"}
          ></TwitterIcon>
        </TwitterShareButton>

        <WhatsappShareButton
          title={`Check out this amazing article on this link -`}
          url={String(window.location)}
        >
          <WhatsappIcon
            className="share-icons"
            size={35}
            round={"true"}
          ></WhatsappIcon>
        </WhatsappShareButton>

        <LinkedinShareButton
          url={String(window.location)}
          title={singleFullBlog.title}
          summary={singleFullBlog.desc}
        >
          <LinkedinIcon
            className="share-icons"
            size={35}
            round={"true"}
          ></LinkedinIcon>
        </LinkedinShareButton>
      </div>
    </div>
  );
}

export default ShareComponent;
