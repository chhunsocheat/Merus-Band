import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import {
  initUser,
  loginUser,
  initBand,
  loginBand,
  isBand,
} from "../../reducers/rootreducer";
import { Container, Row, Col, Alert } from "react-bootstrap";
// import "./button.scss"
import "./auth.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  //getting data from the reducer store

  //dispatch action to trigger the action
  const dispatch = useDispatch();
  let history = useHistory();
  const [status, setStatus] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  //function for when a user click sign in
  const submitHandler = (e) => {
    setStatus("Loading...");
    e.preventDefault();
    axios
      .post(
        "https://bandquest-bandend.herokuapp.com/users/login",
        { email, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        //dispatch an action to the reducer
        //(res.data);
        if (res.status === 201) {
          //(res.data);

          setStatus("Sign in");
          //if not tell the app that the user is not logged in
          dispatch(loginUser(false));
          // //(res.data.message);
          setFeedback(res.data.message);
          // //(feedback);
        }
        //push the route to profile/username
        if (res.data.data.isBand === true) {
          dispatch(isBand(true));
          dispatch(initBand(res.data.data));
          dispatch(loginBand(true));
          history.push(`/band/${res.data.data.username}`);

          //(res.data.data.isBand);
        } else if (res.data.data.isBand === false) {
          dispatch(isBand(false));
          //dispatch an action to the reducer to tell the app
          //that the user has login
          //(res.data.data.isBand);

          setStatus("Sign in");
          dispatch(initUser(res.data.data));
          dispatch(loginUser(true));
          history.push(`/profile/${res.data.data.username}`);
          // //(res);
        }
      })
      .catch((res) => {
        // //(res);
      });
  };
  return (
    <Container className="signin-container" fluid="sm">
      <Row>
        <Col></Col>
        <Col className="backGround" xs={10} md={6}>
          <div>
            <h1 style={{ position: "relative" }}>
              Sign In
              <i
                style={{
                  marginLeft:"5px",
                  top: "60%",
                  position: "absolute",
                  fontSize: "0.8em",
                  transform: "translateY(-50%)",
                }}
                class="fas fa-sign-in-alt"
              ></i>
            </h1>
          </div>
          <form>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {/* showing error message for loggin  */}
            {feedback === null ? (
              <div></div>
            ) : (
              <Alert variant="warning">{feedback}</Alert>
            )}

            <button onClick={submitHandler} type="submit" className="btnMe">
              {status}
            </button>
            <p className="forgot-password text-right">
              <p>
                New to Band Quest <NavLink to="/signup">Sign Up</NavLink>
              </p>
            </p>
          </form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SignIn;
