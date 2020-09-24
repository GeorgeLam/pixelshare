import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ImageHeader from "./ImageHeader";
import ImageControls from "./ImageControls";

import ImageStyles from "../styles/image.module.css";

const Image = () => {
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();
  // const recentPhotos = ["../img/1.jpg"];

  useEffect(() => {
    axios
      .post("http://localhost:5000/photos", { queryType: "recent" })
      .then((response) => {
        console.log(response.data);
        setRecentPhotos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {recentPhotos ? (
        recentPhotos?.map((photo, idx) => (
          <Card
            key={photo._id}
            style={{ width: "100%" }}
            // className={ImageStyles.card}
            className="my-5"
          >
            <Card.Header>
              <ImageHeader author={photo.author} />
            </Card.Header>
            <Card.Img
              variant="top"
              src={aws + photo.fileName}
              // src={require("./1.jpg")}
              alt={`Photo uploaded by ${photo.author}`}
              style={{ maxHeight: 500, objectFit: "cover" }}
            />
            <Card.Body>
              <ImageControls data={photo} />

              <Card.Text>
                <ul style={{ margin: 0, padding: 0 }}>
                  {photo?.comments?.length ? (
                    photo?.comments?.map((comment) => (
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
                <br />
                <span style={{ fontSize: 10 }}>
                  <Link to={`/p/${photo.fileName}`} style={{ color: "gray" }}>
                    {format(photo.uploadTime).toUpperCase()}
                  </Link>
                </span>
              </Card.Text>
            </Card.Body>
            {/* <div className="card-footer">Add a comment...</div> */}
          </Card>
        ))
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default Image;
