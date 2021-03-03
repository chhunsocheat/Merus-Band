import React from "react";
//All library Import
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

//import css

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "semantic-ui-css/semantic.min.css";
import "react-datetime/css/react-datetime.css";

//import components
import NavBar from "./Components/NavBar";
import NavBarBand from "./Components/NavBarBand";

import Join from "./Components/Auth/Join";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import UserProfile from "./Components/Profile/UserProfile";
import BandProfile from "./Components/BandProfile/BandProfile";
import "./css/app.css";
import Category from "./Components/Category/Category";
import Main from "./Components/Explore/Main";
import BandDashBoard from "./Components/Dashboard/BandDashBoard";
import BandDetailForm from "./Components/Dashboard/BandDetailForm";
import BandPerformanceForm from "./Components/Dashboard/BandPerformanceForm";
import BookingForm from "./Components/Booking/BookingForm";
import BandRequests from "./Components/Request/BandRequests"
import UserRequests from "./Components/Request/UserRequests"

import HomePage from "./Components/Home/HomePage"
const App = () => {
  //   const [userDetail,setUserDetail]=useState(null)
  // useEffect(()=>{

  // },[])
  const user = useSelector((state) => {
    return state.user;
  });
  const loginState = useSelector((state) => {
    return state.loginState;
  });
  const loginBandState = useSelector((state) => {
    return state.loginBandState;
  });

  return (
    <div className="app-container">
      <BrowserRouter>
        {loginState ? <NavBar /> : <NavBarBand />}
        <div className="app-inner-container">
          <div className="app-inner-inner-container" style={{ width: "80%" }}>
            {/* Explore Route */}
            <Route exact path="/explore">
              <Main />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            {/* <Route exact path="/explore">
              {loginState || loginBandState ? (
                <Redirect to={"/explore"} />
              ) : (
                <SignIn />
              )}
            </Route> */}
            <Route exact path="/signin">
              {loginState ? (
                <Redirect to={"/profile/" + user.username} />
              ) : (
                <SignIn />
              )}
            </Route>

            <Route exact path="/signup">
              {loginState ? (
                <Redirect to={"/profile/" + user.username} />
              ) : (
                <SignUp />
              )}
            </Route>
            <Route
              exact
              path="/profile/:username"
              render={(props) => <UserProfile />}
            />

            <Route
              exact
              path="/band/:username"
              render={(props) => <BandProfile />}
            />
            <Route exact path="/bandrequests/:username">
              <BandRequests />
            </Route>
            <Route exact path="/userrequests/:username">
              <UserRequests />
            </Route>
            <Route exact path="/dashboard/:username">
              <BandDashBoard />
            </Route>
            <Route exact path="/bookband/:username">
              <BookingForm />
            </Route>
            <Route exact path="/addbanddetail/:username">
              <BandDetailForm />
            </Route>
            <Route exact path="/addbandperformances/:username">
              <BandPerformanceForm />
            </Route>
            <Route exact path="/join" render={(props) => <Join />} />
          </div>
        </div>
      </BrowserRouter>
      <footer id="footer"></footer>
    </div>
  );
};

export default App;
