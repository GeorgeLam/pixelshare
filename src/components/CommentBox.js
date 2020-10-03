import React, { useContext, useRef, useState, useEffect } from "react";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../Context";

const CommentBox = (props) => {
  let history = useHistory();
  console.log(props.commentsArray);
  // console.log(props.data.fileName);
  const [state, setState] = useContext(UserContext);
  const [commentsArray, setCommentsArray] = useState(props.commentsArray || []);

  useEffect(() => {
    console.log(commentsArray);
  }, [commentsArray]);

  const commentRef = useRef();

  const handleComment = () => {
    if (!state.user) {
      history.push("/login");
      return;
    }
    console.log("Posting", state);
    console.log(commentRef.current.value);

    axios
      .post("/photoUpdate/", {
        queryType: "comment",
        commentValue: commentRef.current.value,
        fileName: props.data.fileName,
        currentUser: state.user,
      })
      .then((response) => {
        console.log(response.data);
        commentRef.current.value = "";
        props.setCommentsArray(response.data.comments);
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
