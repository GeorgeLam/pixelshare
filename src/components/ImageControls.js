import React, { useContext, useRef, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../UserContext";

const ImageControls = (props) => {
  //   console.log(props);
  const [state, setState] = useContext(UserContext);
  console.log(props?.data?.likes?.includes(state.user));
  const [likesArray, setLikesArray] = useState(props.data.likes || []);
  const [likeStatus, setLikeStatus] = useState(
    props?.data?.likes?.includes(state.user)
  );
  const likeRef = useRef();

  const handleLike = () => {
    console.log("Liking", state);
    console.log(likeRef);
    setLikeStatus(!likeStatus);
    // likeRef.current.span.outerHTML = `<span>Liked by <strong>${state.user}</strong>`;

    axios
      .post("http://localhost:5000/photoUpdate/", {
        queryType: "like",
        fileName: props.data.fileName,
        currentUser: state.user,
        likeStatus: likeStatus,
      })
      .then((response) => {
        console.log(response.data);
        setLikesArray(response.data.likes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="d-flex flex-row" style={{ color: "black", fontSize: 11 }}>
        <Link to="#" className="mr-2" onClick={handleLike}>
          {likeStatus ? <span>Unlike</span> : <span>Like</span>}
        </Link>
        <Link to="#">Comment</Link>
      </div>
      <div>
        {likesArray?.length ? (
          <>
            {" "}
            <span ref={likeRef}>Liked by </span>
            {likesArray.map((like, idx) => (
              <>
                {idx ? ", " : ""}
                <strong>
                  <Link style={{ color: "black" }} to={`/user/${like}`}>
                    {like}
                  </Link>
                </strong>
              </>
            ))}
          </>
        ) : (
          <span>No likes yet</span>
        )}
      </div>
    </div>
  );
};

export default ImageControls;
