import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";

import Card from "react-bootstrap/Card";
import ImageHeader from "./ImageHeader";
import ImageControls from "./ImageControls";
import CommentBox from "./CommentBox";

const RecentPhoto = ({ photo }) => {
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  console.log("ajaja", photo);
  const [commentsArray, setCommentsArray] = useState(photo.comments || []);

  return (
    <Card
      key={photo._id}
      style={{ width: "100%" }}
      // className={ImageStyles.card}
      className="my-5"
    >
      <Card.Header>
        <ImageHeader author={photo.author} fileName={photo.fileName} />
      </Card.Header>
      <img
        variant="top"
        src={aws + photo.fileName}
        // src={require("./1.jpg")}
        alt={`Photo uploaded by ${photo.author}`}
        style={{ maxHeight: 500, objectFit: "cover", width: "100%" }}
      />
      <Card.Body>
        <ImageControls data={photo} />

        <Card.Text className="mt-1">
          {photo?.caption && <span>{photo?.caption}</span>}
          <ul style={{ margin: 0, padding: 0 }}>
            {commentsArray?.length > 2 && (
              <Link
                to={`/p/${photo?.fileName}`}
                style={{ color: "gray", fontWeight: 400 }}
              >
                See all {commentsArray?.length} comments
              </Link>
            )}
            {commentsArray?.length ? (
              commentsArray?.slice(commentsArray.length - 2).map((comment) => (
                <li style={{ listStyle: "none" }}>
                  <strong className="mr-1">
                    <Link
                      style={{ color: "black" }}
                      to={`/user/${comment.user}`}
                    >
                      {comment.user}
                    </Link>
                  </strong>
                  {comment.comment}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
          <span style={{ fontSize: 10 }}>
            <Link to={`/p/${photo.fileName}`} style={{ color: "gray" }}>
              {format(photo.uploadTime).toUpperCase()}
            </Link>
          </span>
        </Card.Text>
      </Card.Body>
      <div>
        <CommentBox
          style={{ width: "100%" }}
          data={photo}
          commentsArray={commentsArray}
          setCommentsArray={setCommentsArray}
        />
      </div>
    </Card>
  );
};

export default RecentPhoto;
