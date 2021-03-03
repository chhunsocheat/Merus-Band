import React from "react";
//All library Import

//import css

import "./home.css";

import splashImage from "../../image/rock-radio.jpg";

import bandImage from "../../image/band.jpg";
import crowdImage from "../../image/crowd.jpg";


const HomePage = () => {
    return(
        <React.Fragment>
        <div className="splash-image" >
        <div className="container" >
          <img src={splashImage}  alt="" width="100%" height="100%" />
          <h1  >Band Quest</h1>
          <p >The place where bands and event organise collaborate to entertain at events.</p>
        </div>
      </div>

        <div className="row" >
        <div className="column" >
          <img src={bandImage} alt="" width="100%" height="100%" style={{borderRadius:"50px"}} />
          <h1 className="card-text" >Bands</h1>
          <p className="card-text2" >Earn money doing what you love the most.</p>
        </div>
        <div className="column">
          <img src={crowdImage} alt="" width="100%" height="100%" style={{borderRadius:"50px"}} />
          <h1 className="card-text" >Event Organisers</h1>
          <p className="card-text2" >Hire a band for your next event with ease.</p>
        </div>
      </div>
      </React.Fragment>
    );
}

export default HomePage;