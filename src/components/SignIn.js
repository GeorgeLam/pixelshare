import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { auth, firestore } from "../firebase";

import { Card, Button, Form } from "react-bootstrap/";
import ImageStyles from "../styles/image.module.css";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = () => {
    console.log("Signing in...", email, password);
  };

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
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
          <span className="text-center">Sign In</span>
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

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                defaultValue={password}
                onChange={handlePasswordInput}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              className="w-100"
              onClick={signIn}
            >
              Submit
            </Button>
          </Form>{" "}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignIn;
