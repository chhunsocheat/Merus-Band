import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initUser,
  loginBand,
  initBand,
  isBand,
} from "../../reducers/rootreducer";
import { Dropdown } from "semantic-ui-react";

import { Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./auth.css";

const Join = () => {
  // const user = useSelector((state) => {
  //     return state.user;
  //   });

  const options = [
    { key: "Pop", text: "Pop", value: "Pop" },
    { key: "Jazz", text: "Jazz", value: "Jazz" },
    { key: "Blues", text: "Blues", value: "Blues" },
    { key: "K-Pop", text: "K-Pop", value: "K-Pop" },
    
  ];
  const dispatch = useDispatch();
  let history = useHistory();
  //setting the state for the user to sign up
  const [status, setStatus] = useState("Join");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setusername] = useState("");
  const [members, setMembers] = useState(0);
  const [genre, setGenre] = useState("");
  const [feedback, setFeedback] = useState([]);
  //---------------------------------
  //handler for on change fields
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleusernameChange = (e) => {
    const username = e.target.value;
    setusername(username);
  };
  const handleMemberChange = (e) => {
    const member = e.target.value;
    setMembers(member);
  };
  const handleGenreChange = (e,data) => {
    const genre = data.value;
    //(data.value);
    setGenre(genre);
  };
  //---------------------------------
  //function to handle when the user click sign upo
  const submitHandler = (e) => {
    setStatus("Loading...");

    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/users/band",
        { email, username, members, genre, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        //same as in signin
        dispatch(initBand(res.data.data));
        //push the route to profile/username
        if (res.status === 200) {
          setStatus("Join");
          dispatch(isBand(true));
          dispatch(loginBand(true));
          //(res);
          // //(res);
          history.push(`/band/${res.data.data.username}`);
          // //(res);
        } else {
          setStatus("Sign Up");

          // //(res.data.message);
          setFeedback(res.data.message);
          // //(feedback);
        }
      })
      .catch((res) => {
        //(res);
      });
  };
  return (
    <Container className="signup-container" fluid="sm">
      <Row>
        <Col></Col>

        <Col className="backGround" xs={10} md={6}>
          <h1>Join Us</h1>
          <form>
            <label htmlFor="username">Email</label>
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
            <label htmlFor="username">Password</label>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <label htmlFor="username">Bandname</label>
            <div className="form-group">
              <input
                type="text"
                name="bandname"
                className="form-control"
                placeholder="Bandname"
                value={username}
                onChange={handleusernameChange}
              />
            </div>
            <label htmlFor="member">Members</label>
            <div className="form-group">
              <input
                type="number"
                name="member"
                className="form-control"
                placeholder="Number of Members"
                value={members}
                onChange={handleMemberChange}
              />
            </div>
            <label htmlFor="genre">Genre</label>

            <div className="form-group">
              {/* <input
                type="text"
                name="genre"
                className="form-control"
                placeholder="Your Genre"
                value={genre}
                onChange={handleGenreChange}
              /> */}
              <Dropdown
                onChange={handleGenreChange}
                placeholder="Skills"
                fluid
                search
                multiple
                selection
                options={options}
              />
              {/* <button onClick={(e)=>{
                e.preventDefault()
                //(genre);
              }}>check</button> */}
            </div>

            {/* //giving user error messages of why they cannot sign up */}
            {feedback.map((feedback) => (
              <Alert variant="warning">{feedback.message}</Alert>
            ))}
            <button onClick={submitHandler} type="submit" className="btnMe">
              {status}
            </button>
          </form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Join;
