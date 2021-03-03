import React from "react";
import { useSelector, useDispatch } from "react-redux";
//All library Import
import { NavLink, useHistory } from "react-router-dom";
//import from bootstrap
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
//import components
import { logoutBand } from "../reducers/rootreducer";
import Category from "./Category/Category"

//Import site logo
import siteLogo_Black from "../css/logo-black.png";

import "../css/navbar.css";

const NavBarBand = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  //function to log user out
  function loggedOutBand() {
    //set user state to null when click sign out
    dispatch(
        logoutBand({ bandDetail: { username: "anonymous" }, loginBandState: false })
    );
    //route user to sign in page after click sign out
    history.push("/signin");
  }
  //geting state from the store
  const user = useSelector((state) => {
    return state.user;
  });
  const band = useSelector((state) => {
    return state.band;
  });
  const loginState = useSelector((state) => {
    return state.loginState;
  });
  const loginBandState = useSelector((state) => {
    return state.loginBandState;
  });

  return (
    // a navbar component from bootstra-react
    <div>
    <Navbar
      style={{ marginBottom: "0px" }}
      className="mb-3"
      bg="light"
      expand="sm"
    >
      <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand className="ml-auto" href="/">
          <img src={siteLogo_Black} alt="" className="logoClass" />
        </Navbar.Brand>
        <Form inline className="ml-auto mr-auto">
          <FormControl
            type="text"
            placeholder="Search..."
            className="ml-auto mr-3"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav className="mr-auto" style={{color:"white",fontSize:"20px",fontWeight:"500",color:"white"}}>
          {/* condition rednering to check when user is null when sign out */}
          {/* //Feeds tab is able to see even when you are not logged in */}
          <Nav.Link title="Home" as={NavLink} to="/explore">
           Explore
          </Nav.Link>
          {loginBandState ? (
            [
              <Nav.Link
                title="saved"
                key="1"
                as={NavLink}
                to={`/bandrequests/${band.username}`}
              >
                Requests
              </Nav.Link>,

              <Nav.Link title="Bands" key="2" as={NavLink} to={"/dashboard/" + band.username}>
                Dashboard
              </Nav.Link>,
              <NavDropdown key="3" title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item key="4">
                  <Nav.Link title="Bands" key="2" as={NavLink} to="/">
                    <i class="fas fa-music"></i>
                    See Your <p>Request</p>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  key="5"
                  className="sign-out"
                  onClick={loggedOutBand}
                >
                  <i className="mr-1" className="fas fa-sign-out-alt"></i>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>,
            ]
          ) : (
            <Nav.Link as={NavLink} to="/signin" className="active">
              <i className="fas fa-sign-in-alt mr-2 ml-2"></i>
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Category/>
    </div>
  );
};

export default NavBarBand;
