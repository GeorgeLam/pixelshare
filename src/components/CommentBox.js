import React, { useContext, useRef, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../UserContext";

const CommentBox = (props) => {
  console.log(props);
  console.log(props.data.fileName);
  const [state, setState] = useContext(UserContext);

  const commentRef = useRef();

  const handleComment = () => {
    console.log("Posting", state);
    console.log(commentRef.current.value);

    axios
      .post("http://localhost:5000/photoUpdate/", {
        queryType: "comment",
        commentValue: commentRef.current.value,
        fileName: props.data.fileName,
        currentUser: state.user,
      })
      .then((response) => {
        console.log(response.data);
        commentRef.current.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderTop: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <textarea
        placeholder="Add a comment..."
        ref={commentRef}
        style={{
          width: "100%",
          overflow: "auto",
          border: "none",
          resize: "none",
          height: 40,
          padding: "0.4em 0.8em",
        }}
      ></textarea>
      <Link to="#" style={{ padding: "0.4em 0.7em" }} onClick={handleComment}>
        Post
      </Link>
    </div>
  );
};

export default CommentBox;
