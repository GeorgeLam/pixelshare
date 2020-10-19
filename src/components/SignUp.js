import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { auth, firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

import { Card, Button, Form } from "react-bootstrap/";
import ImageStyles from "../styles/image.module.css";

const SignUp = () => {
  let history = useHistory();

  const [email, setEmail] = useState();
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

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
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
      // alert("Passwords do not match!");
      Swal.fire({
          icon: 'error',
          title: 'Passwords do not match!',
          // text: response.data.error,
        })
      return;
    }
    console.log("Signing up...", email, password);
  };

  const signUp = () => {
    if (email?.length < 6 || password?.length < 6){
      Swal.fire({
          icon: 'error',
          title: 'Log in details are not strong enough',
          // text: response.data.error,
        });
        return;
    }
    if(password != passwordConfirm){
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match',
          // text: response.data.error,
        });
        return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
         console.log("AAAAA", error)
      })
      .then((res) => {
        return auth.currentUser.updateProfile({
          displayName: username,
        });
      })
      .then(function () {
        console.log("Logged in...");
        history.push("/");
      })
       .catch(function(error) {
         console.log("AAAAA", error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          // alert('The password is too weak.');
          Swal.fire({
          icon: 'error',
          title: 'Password is too weak',
          // text: response.data.error,
        })
        } else {
          alert(errorMessage);
          Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: errorMessage,
        })
        }
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
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={email}
                onChange={handleEmailInput}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

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
              onClick={signUp}
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
