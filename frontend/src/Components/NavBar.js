import React from "react";
import { useSelector, useDispatch } from "react-redux";
//All library Import
import { NavLink, useHistory } from "react-router-dom";
//import from bootstrap
import Button from "react-bootstrap/Button";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
//import components
import { logoutUser } from "../reducers/rootreducer";
import "../css/navbar.css";

//Import site logo
import siteLogo_White from "../css/logo-white.png";

const NavBar = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  //function to log user out
  function loggedOutUser() {
    //set user state to null when click sign out
    dispatch(
      logoutUser({ userDetail: { username: "anonymous" }, loginState: false })
    );
    //route user to sign in page after click sign out
    history.push("/signin");
  }
  //geting state from the store
  const user = useSelector((state) => {
    return state.user;
  });
  const loginState = useSelector((state) => {
    return state.loginState;
  });

  return (
    // a navbar component from bootstra-react
    <Navbar
      style={{ marginBottom: "0px" }}
      bg="dark"
      variant="light"
      className="mb-3"
      expand="sm"
    >
      <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand className="ml-auto mr-auto" href="/">
          <img className="logoClass" src={siteLogo_White} alt=""  />
        </Navbar.Brand>
        <Form inline className="ml-auto mr-auto">
          <FormControl
            type="text"
            placeholder="Search..."
            className="ml-auto mr-3"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav
          className="mr-auto"
          style={{color:"white", fontSize: "20px", fontWeight: "500", color: "white" }}
        >
          {/* condition rednering to check when user is null when sign out */}
          {/* //Feeds tab is able to see even when you are not logged in */}
          <Nav.Link  title="Home" as={NavLink} to="/explore">
            Explore
          </Nav.Link>
          {loginState ? (
            [
              <Nav.Link title="Profile" key="1" as={NavLink} to={`/userrequests/${user.username}`}>
                Requested
              </Nav.Link>,

              <Nav.Link
                title="Profile"
                key="2"
                as={NavLink}
                to={"/profile/" + user.username}
              >
                Profile
              </Nav.Link>,
              <NavDropdown key="3" title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item key="4">
                  <Nav.Link title="Bands" key="2" as={NavLink} to="/join">
                    <i class="fas fa-music"></i>
                    Find A Band
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  key="5"
                  className="sign-out"
                  onClick={loggedOutUser}
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
  );
};

export default NavBar;
