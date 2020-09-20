import React, { useEffect, useState, useRef } from "react";

import axios from "axios";

import { Card, Button, Form } from "react-bootstrap/";
import ImageStyles from "../styles/image.module.css";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

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

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmInput = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    const details = { username, password, passwordConfirm };
    // console.log(details);
    console.log("Signing up...", username, password, passwordConfirm);
    axios
      .post("http://localhost:5000/signup", details)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Card
        //   key={photo._id}
        style={{ width: "100%" }}
        // className={ImageStyles.card}
        className="my-5"
      >
        <Card.Header>
          <span className="text-center">Sign Up</span>
        </Card.Header>
        <Card.Body>
          <Form className="mx-auto mb-3" style={{ width: "80%" }}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                defaultValue={username}
                onChange={handleUsernameInput}
                type="username"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                defaultValue={password}
                onChange={handlePasswordInput}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group controlId="formPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                defaultValue={passwordConfirm}
                onChange={handlePasswordConfirmInput}
                type="password"
                placeholder="Confirm your password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              className="w-100"
              onClick={handleSignUp}
            >
              Submit
            </Button>
          </Form>{" "}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
