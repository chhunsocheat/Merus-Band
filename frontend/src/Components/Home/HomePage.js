import React from "react";
//All library Import

//import css

import "./home.css";

import splashImage from "../../image/rock-radio.jpg";

import bandImage from "../../image/band.jpg";
import crowdImage from "../../image/crowd.jpg";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="upper-container">
        <img src={splashImage} alt="" />
        <div className="upper-container-inner">
          <h1>Band Quest</h1>
          <p>
            The place where bands and event organise collaborate to entertain at
            events.
          </p>
        </div>
      </div>

      <div className="lower-container">
        <div className="column">
          <img src={bandImage} alt={bandImage} />
          <div className="lower-container-inner">
            <h1 className="card-text">Bands</h1>
            <p className="card-text2">
              Earn money doing what you love the most.
            </p>
          </div>
        </div>
        <div className="column">
          <img src={crowdImage} alt={crowdImage} />
          <div className="lower-container-inner">
            <h1 className="card-text">Event Organisers</h1>
            <p className="card-text2">
              Hire a band for your next event with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
