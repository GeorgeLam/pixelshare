import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import ImageStyles from "../styles/image.module.css";

const ImageHeader = (props) => {
  return (
    <>
      <Link to={`/user/${props.author}`}>
        <img
          src={require("./1.jpg")}
          className="rounded-circle mr-3 profilePhoto"
          alt="user's profile picture"
          width="30"
          height="30"
        ></img>
      </Link>
      <Link
        to={`/user/${props.author}`}
        className={ImageStyles.username}
        style={{ color: "black", textDecoration: "none" }}
      >
        {props.author}
      </Link>
    </>
  );
};

export default ImageHeader;
