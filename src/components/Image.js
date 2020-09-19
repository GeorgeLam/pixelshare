import React, { useEffect, useState } from "react";

import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ImageStyles from "../styles/image.module.css";

const Image = () => {
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  //   const [recentPhotos, setRecentPhotos] = useState();
  const recentPhotos = ["../img/1.jpg"];

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/photos")
  //       .then((response) => {
  //         console.log(response.data);
  //         setRecentPhotos(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }, []);

  return (
    <div>
      {recentPhotos ? (
        recentPhotos?.map((photo) => (
          <Card
            //   key={photo._id}
            style={{ width: "100%" }}
            // className={ImageStyles.card}
            className="my-5"
          >
            <Card.Header>
              <img
                src={require("./1.jpg")}
                className="rounded-circle mr-3 profilePhoto"
                alt="user's profile picture"
                width="30"
                height="30"
              ></img>
              <span className={ImageStyles.username}>murakami</span>
            </Card.Header>
            <Card.Img
              variant="top"
              //   src={aws + photo.fileName}
              src={require("./1.jpg")}
              //   alt={`Photo uploaded by ${photo.author}`}
            />
            <Card.Body>
              <Card.Text>
                No likes yet.
                <br /> See all comments.
              </Card.Text>
            </Card.Body>
            <div class="card-footer">Add a comment...</div>
          </Card>
        ))
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default Image;
