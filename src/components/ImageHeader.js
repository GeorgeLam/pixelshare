import React, { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";
import { UserContext } from "../UserContext";

import ImageStyles from "../styles/image.module.css";

const ImageHeader = (props) => {
  const [state, setState] = useContext(UserContext);
  console.log(state.user);
  console.log(props);
  // const deleteComment = props.deleteComment;

  return (
    <div className={`d-flex flex-row ${props.comment && "mb-3 px-3 py-2"}`}>
      <Link to={`/user/${props.author}`}>
        <img
          src={require("./1.jpg")}
          className="rounded-circle mr-3 profilePhoto"
          alt="user's profile picture"
          width="30"
          height="30"
        ></img>
      </Link>
      <div
        className="d-flex flex-column"
        style={{ fontSize: props.comment ? "0.8em" : "1em" }}
      >
        <Link
          to={`/user/${props.author}`}
          className={ImageStyles.username}
          style={{ color: "black", textDecoration: "none" }}
        >
          {props.author}
        </Link>
        {props.comment && (
          <>
            {" "}
            <span>{props.comment}</span>
            <span style={{ fontSize: 10, color: "gray" }}>
              {format(props.commentTime).toUpperCase()}
            </span>
          </>
        )}
        {props.author == state.user && props.comment && (
          <span
            onClick={() => {
              props.deleteComment(props.commentTime, props.author);
            }}
          >
            Delete!
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageHeader;
