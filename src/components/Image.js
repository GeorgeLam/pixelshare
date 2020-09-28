import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import RecentPhoto from "./RecentPhoto";

import ImageStyles from "../styles/image.module.css";

const Image = () => {
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();
  // const recentPhotos = ["../img/1.jpg"];
  const [commentsArray, setCommentsArray] = useState([]);

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
        recentPhotos?.map((photo, idx) => <RecentPhoto photo={photo} />)
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default Image;
