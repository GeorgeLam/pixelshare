import React, { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";

import ImageHeader from "./ImageHeader";
import ImageControls from "./ImageControls";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext } from "../Context";
import { format, render, cancel, register } from "timeago.js";
import CommentBox from "./CommentBox";

const ImageDetailedBox = (props) => {
  let setSrc = props.data ? props.data : require("./1.jpg");
  console.log("!!!", props.data);
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";

  let history = useHistory();
  const [state, setState] = useContext(UserContext);
  const [commentsArray, setCommentsArray] = useState(props.data.comments || []);

  const commentRef = useRef();

  useEffect(() => {
    console.log(commentsArray);
  }, [commentsArray]);

  const handleComment = () => {
    if (!state.user) {
      history.push("/login");
      return;
    }
    if (!commentRef.current.value) return;
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
        commentRef.current.value = "";
        console.log(response.data);
        setCommentsArray(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          // minWidth: "60%"
          flex: 1,
        }}
      >
        <img
          // src={require("./1.jpg")}
          src={aws + props.data.fileName}
          style={{
            maxHeight: 600,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        ></img>{" "}
      </div>
      <>
        <div
          className="d-flex flex-column"
          style={{
            backgroundColor: "white",
            // border: "1px solid rgba(0,0,0,0.3)",
            // minWidth: 250,
            // flex: 1,
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
            <ImageHeader
              author={props.data.author}
              fileName={props.data.fileName}
            />
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
              {props?.data?.caption && (
                <ImageHeader
                  author={props.data.author}
                  comment={props.data.caption}
                  commentTime={props.data.uploadTime}
                  caption={1}
                />
              )}
              {commentsArray?.length ? (
                commentsArray?.map((comment) => (
                  <ImageHeader
                    author={comment.user}
                    comment={comment.comment}
                    commentTime={comment.commentTime}
                    fileName={props.data.fileName}
                    deleteComment={1}
                    setCommentsArray={(newComments) => {
                      console.log("sca");
                      setCommentsArray(newComments);
                    }}
                  />
                ))
              ) : (
                <span className="p-2"></span>
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
            <CommentBox
              data={props.data}
              commentsArray={commentsArray}
              setCommentsArray={setCommentsArray}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default ImageDetailedBox;
