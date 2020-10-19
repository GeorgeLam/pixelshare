import React, { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";
import { UserContext } from "../Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

import ImageStyles from "../styles/image.module.css";

const ImageHeader = (props) => {
  console.log(props.fileName);
  let history = useHistory();

  const [state, setState] = useContext(UserContext);
  console.log(state.user);
  console.log(props);
  // const deleteComment = props.deleteComment;

  const deleteComment = (commentTime, author) => {
    console.log("Deleting", commentTime, author);

    axios
      .post("/photoUpdate/", {
        queryType: "commentDelete",
        fileName: props.fileName, ///////////////////
        commentTime: commentTime,
        author: author,
      })
      .then((response) => {
        console.log(response.data);
        props.setCommentsArray(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deletePhoto = (fileName) => {
    console.log("Deleting", fileName);

    axios
      .post("/photoUpdate/", {
        queryType: "photoDelete",
        fileName: fileName,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.deletedCount) {
          // alert("Photo has been deleted!");
          Swal.fire(
          'Profile has been deleted!',
          'Redirecting to homepage...',
          'success'
        )
          history.push("/");
        }
        // setCommentsArray(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={`d-flex flex-row ${props.comment && "mb-3 px-3 py-2"}`}>
      <div style={{ flex: 1, display: "flex" }}>
        <Link to={`/user/${props.author}`}>
          <img
            // src={require("./1.jpg")}
            src={`https://pixelshare.s3.amazonaws.com/${props.author}`}
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
        </div>
      </div>

      <div>
        {props.author == state.user && props.comment && !props.caption && (
          <span
            onClick={() => {
              if (window.confirm("Confirm comment deletion?")) {
                deleteComment(props.commentTime, props.author);
              }
            }}
          >
            <img
              src={require("../img/trash.svg")}
              style={{ height: " 30%", cursor: "pointer" }}
            ></img>
          </span>
        )}
        {props.author == state.user && !props.comment && !props.caption && (
          <span
            onClick={() => {
              if (window.confirm("Confirm photo deletion?")) {
                deletePhoto(props.fileName);
              }
            }}
          >
            <img
              src={require("../img/trash.svg")}
              style={{ height: " 30%", cursor: "pointer" }}
            ></img>
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(ImageHeader);
