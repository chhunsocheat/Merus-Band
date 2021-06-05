import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { initUser, loginUser } from "../../reducers/rootreducer"

import { Container, Row, Col, Alert } from 'react-bootstrap'
import { NavLink } from "react-router-dom"
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import "./auth.css"

const SignUp = () => {
  const dispatch = useDispatch()
  let history = useHistory();
  //setting the state for the user to sign up
    const [status,setStatus] =useState("Sign Up")
    const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [feedback, setFeedback] = useState([])
  //---------------------------------
  //handler for on change fields
  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handlePassword2Change = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };
  //---------------------------------
  //function to handle when the user click sign upo
  const submitHandler = (e) => {
    setStatus("Loading...")

    e.preventDefault();
    axios
      .post(
        "https://bandquest-bandend.herokuapp.com/users/",
        { username, email, password, password2 },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        //same as in signin
        dispatch(initUser(res.data.data))
        //push the route to profile/username
        if (res.status === 200) {
          //if the status is ok 200 then we dispatch the action to the 
          //store and route the user to the app interface
          setStatus("Sign Up")

          dispatch(loginUser(true))
       
          history.push(`/profile/${res.data.data.username}`)
        }
        else {
          setStatus("Sign Up")

          setFeedback(res.data.message)
        }
      })
      .catch((res) => {
      });
  };
  return (
    <Container className="signup-container" fluid="sm">
      <Row>
        <Col></Col>
        <Col className="backGround" xs={10} md={6}>
        <h1 style={{position:"relative"}}>Sign Up
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

          <form >

            <div className="form-group">
              <input type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <input type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group">
              <input type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <input type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={password2}
                onChange={handlePassword2Change}
              />
            </div>
            {/* //giving user error messages of why they cannot sign up */}
            {feedback.map(feedback => <Alert variant="warning">{feedback.message}</Alert>)}
            <button onClick={submitHandler} type="submit" className="btnMe">{status}</button>
            <p className="forgot-password text-left" style={{marginTop:"10px"}}>Already a member? 
              <NavLink className="forgot-password text-right" to="/signin"> Sign In</NavLink>
            </p>
            <p className="forgot-password text-left">Register Your Band? 
              <NavLink className="forgot-password text-right" to="/join"> Band Sign Up
              </NavLink>
            </p>


          </form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SignUp;