import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import axios from "axios";
import Button from "react-bootstrap/Button";
import RecentPhoto from "./RecentPhoto";
import Loader from "./Loader";

import ImageStyles from "../styles/image.module.css";

const Image = () => {
  const [showImageCount, setShowImageCount] = useState(3);
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();
  // const recentPhotos = ["../img/1.jpg"];
  const [commentsArray, setCommentsArray] = useState([]);
  const [query, setQuery] = useState("recent");

  useEffect(() => {
    axios
      .post("http://localhost:5000/photos", { queryType: query })
      .then((response) => {
        console.log(response.data);
        setRecentPhotos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [query]);

  return (
    <div>
      {recentPhotos ? (
        <>
          {recentPhotos?.slice(0, 100).map((photo, idx) => (
            <RecentPhoto photo={photo} />
          ))}
          <span className="d-flex justify-content-center mb-3">
            <Link
              to="#"
              onClick={() => {
                // setShowImageCount(showImageCount + 3);
                setQuery("moreRecentPhotos");
              }}
            >
              Load more photos...
            </Link>
          </span>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default Image;
