import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { auth, firestore } from "../firebase";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Layout from "../Layout";
import { UserContext } from "../Context";

const Uploader = ({ type }) => {
  const [state, setState] = useContext(UserContext);
  let history = useHistory();
  const captionRef = useRef(null);

  // console.log("up");
  const data = { hello: "here it is" };
  const [acceptableFile, setAcceptableFile] = useState();
  const [file, setFile] = useState();
  const [loaded, setLoaded] = useState();
  const [recentFile, setRecentFile] = useState();

  const upload = async (e) => {
    e.preventDefault();
    console.log(e.target.files);
    if (e?.target?.files[0]?.type?.slice(0, 5) !== "image") {
      setAcceptableFile(0);
      alert("File type unsupported - please only upload images");
      return;
    } else {
      console.log(window.URL.createObjectURL(e.target.files[0]));
      setLoaded(window.URL.createObjectURL(e.target.files[0]));

      setAcceptableFile(1);
    }
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // console.log(window.URL.createObjectURL(croppedImage));

    // console.log("uppp");
    console.log(croppedImage);

    if (croppedImage.size > 400000) {
      alert("File too large - please select images under 400kb");
      return;
    }

    var data = new FormData();
    data.append("imageUpload", croppedImage);
    if (!type) {
      data.append("caption", captionRef.current.value);
      data.append("authorName", state.user);
    }
    if (type) {
      data.append("type", type);
      data.append("username", state.user);
    }
    // let postUrl = type
    //   ? "http://localhost:5000/profilePhoto"
    //   : "http://localhost:5000/api";

    axios
      .post("/api", data, {
        headers: {
          encType: "multipart/form-data",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);
        if (type) {
          alert("Profile photo will take around a minute to update");
        }
        if ("error" in response?.data) {
          alert(response.data.error);
          if (!type) history.push("/");
          return;
        }
        if ("success" in response?.data && !type) {
          setTimeout(() => {
            setLoaded(response.data.location);
            alert("Image uploaded!");
            if (!type) history.push("/");
          }, 1000);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  //   useEffect(() => {
  //     if (loaded) {
  //       setRecentFile(loaded);
  //     }
  //   }, [loaded]);

  //Image crop functions start
  const [crop, setCrop] = useState({
    unit: "px", // default, can be 'px' or '%'
    x: 130,
    y: 50,
    width: 50,
    height: 50,
    aspect: 1 / 1,
    maxHeight: 1200,
    maxWidth: 1200,
    minHeight: 500,
    minHeight: 500,
  });

  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);

  const onImageLoaded = (image) => {
    setImageRef(image);
    // setCroppedImage(image);
  };

  const onCropChange = (crop) => {
    console.log("Changed!");
    setCrop(crop);
  };

  const onCropComplete = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imageRef, crop);
      setCroppedImageURL(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX * 2,
      crop.height * scaleY * 2,
      0,
      0,
      crop.width * 2,
      crop.height * 2
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      console.log(blob);
      setCroppedImage(blob);
    });
  };

  //Image crop functions end

  return (
    <>
      <div className="col text-center">
        <p>{croppedImage && `Image preview: ${croppedImage.size / 1000} kb`}</p>

        {loaded && (
          <>
            {/* <img style={{ width: 400 }} src={loaded}></img> */}
            <ReactCrop
              crop={crop}
              src={loaded}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          </>
        )}
      </div>

      <div className="col text-center">
        {state.user ? (
          <>
            <form
              method="post"
              // action="http://localhost:5000/api"
              encType="multipart/form-data"
              id="#"
              onSubmit={handleUpload}
            >
              <div className="form-group files">
                <label>Upload Your File (max: 400kb)</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  multiple=""
                  onChange={upload}
                  accept="image/*"
                ></input>
              </div>
              {!type && (
                <textarea
                  style={{ width: "100%" }}
                  ref={captionRef}
                  placeholder="Enter a caption..."
                ></textarea>
              )}
              {acceptableFile && croppedImage ? (
                <button className="btn btn-success my-2">Upload</button>
              ) : (
                <button className="btn btn-success" disabled>
                  Upload
                </button>
              )}
            </form>
          </>
        ) : (
          "You must log in first!"
        )}
      </div>
    </>
  );
};

export default Uploader;
