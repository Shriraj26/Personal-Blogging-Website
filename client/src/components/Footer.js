import React from "react";
import "../Footer.css";

function Footer(props) {
  return (
    <div className="footer flex-div justify-center align-center">
      <h1>
        Copyright <span dangerouslySetInnerHTML={{ __html: "&copy;" }} /> 2021
        All Right Reserved
      </h1>
    </div>
  );
}

export default Footer;
