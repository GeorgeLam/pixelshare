import React, { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";

import ImageHeader from "./ImageHeader";
import ImageControls from "./ImageControls";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { format, render, cancel, register } from "timeago.js";
import CommentBox from "./CommentBox";

const FullArea = (props) => {
  const [state, setState] = useContext(UserContext);
  const [commentsArray, setCommentsArray] = useState(props.data.comments || []);

  const commentRef = useRef();

  useEffect(() => {
    console.log(commentsArray);
  }, [commentsArray]);

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
        setCommentsArray(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteComment = (commentTime, author) => {
    console.log("Deleting", commentTime, author);

    axios
      .post("http://localhost:5000/photoUpdate/", {
        queryType: "commentDelete",
        fileName: props.data.fileName,
        commentTime: commentTime,
        author: author,
      })
      .then((response) => {
        console.log(response.data);
        setCommentsArray(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.3)",
        // minWidth: 250,
        flex: 1,
        // height: "100%",
        // overflowY: "auto",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "0.8em",
        }}
      >
        <ImageHeader author={props.data.author} />
      </div>

      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          //   padding: "0.8em",
          height: "75%",
          overflowY: "auto",
        }}
      >
        <div>
          {commentsArray?.length ? (
            commentsArray?.map((comment) => (
              <ImageHeader
                author={comment.user}
                comment={comment.comment}
                commentTime={comment.commentTime}
                deleteComment={deleteComment}
              />
            ))
          ) : (
            <span className="p-2">No comments yet</span>
          )}
        </div>
      </div>
      <div
        style={{
          padding: "0.8em",
        }}
      >
        <ImageControls data={props.data} />

        <span style={{ fontSize: 10 }}>
          <Link to={`/p/${props.data.fileName}`} style={{ color: "gray" }}>
            {format(props.data.uploadTime).toUpperCase()}
          </Link>
        </span>
      </div>
      <div>
        {/* <CommentBox data={props.data} /> */}
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
          <Link
            to="#"
            style={{ padding: "0.4em 0.7em" }}
            onClick={handleComment}
          >
            Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullArea;
