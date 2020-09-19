import React, { useEffect, useState } from "react";
import axios from "axios";

const Image = () => {
  const aws = "https://pixelshare.s3.eu-west-2.amazonaws.com/";
  const [recentPhotos, setRecentPhotos] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/photos")
      .then((response) => {
        console.log(response.data);
        setRecentPhotos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <p>Recently uploaded images:</p>
      {recentPhotos &&
        recentPhotos?.map((photo) => (
          <img
            key={photo._id}
            src={aws + photo.fileName}
            alt={`Photo uploaded by ${photo.author}`}
          ></img>
        ))}
    </div>
  );
};

export default Image;
