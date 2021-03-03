import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button,Rating } from 'semantic-ui-react'
import axios from "axios";
const BandDashBoard = () => {
  const history = useHistory();
  const band = useSelector((state) => {
    return state.band;
  });
  const [videos, setVideos] = useState([
    {
      vdoUrl: "",
      vdoDescription: "",
    },
  ]);
  const [bandProfile, setBand] = useState({
    description: {
      bandTitle: "No title Yet",
      bandDescription: "No Description yet",
      bandPrice: "Not Set",
    },
  });
  const [rating, setRating] = useState({ rating: 4 });
/**
 * function to load data of the band from the server
 */
  async function loadBand() {
    const bandData = await axios.get(
      `http://localhost:3001/users/${band.username}`
    );
    setBand(bandData.data);
    setVideos(bandData.data.videos);
  }
  //routing band to the addDetail and addPerformance page.
  const addDetail = () => {
    history.push(`/addbanddetail/${band.username}`);
  };
  const addPerformances = () => {
    history.push(`/addbandperformances/${band.username}`);
  };
  useEffect(() => {
    //(band);
    loadBand();
  }, []);
  return (
    <div style={{marginTop:"60px"}}>
      <div className="bandLeft">
        <div className="bandLeftUpper">
          {/* <Button
          color='green'
            onClick={() => {
              //(rating);
            }}
          >
            View
          </Button> */}
          <img src={band.userImg} alt="" />
          <h3>{band.username}</h3>
          <p> {bandProfile.description.bandTitle}</p>
          <Rating icon='star' maxRating={5} defaultRating={4} clearable />

          <div style={{color:"rgb(124,124,125)"}}><i class="fas fa-flag"></i>Report</div>
          <Button
          style={{margin:"30px 0px"}}
          color='green'
            onClick={() => {
              history.push(`/band/${band.username}`);
            }}
          >
            <i class="fas fa-eye"></i> View As Public
          </Button>
          <div className="bandLeftButton">
          <Button
          color='red'
          onClick={addPerformances}  >
              <i class="fab fa-youtube"></i>
              Upload Your Performances
              </Button>
            <Button color='green' onClick={addDetail}>
            <i class="fas fa-file-alt"></i>
              Add/Edit Band Detail
            </Button>
          </div>
          <div className="moreInfo">
            <p className="moreInfoLeft">
              <i class="fas fa-map-marker-alt"></i>From
            </p>
            <p className="moreInfoRight">Australia</p>
            <p className="moreInfoLeft">
              <i class="fas fa-users"></i>Received Requests
            </p>
            <p className="moreInfoRight">{band.members}</p>
            <p className="moreInfoLeft">
              <i class="fas fa-user"></i>Pending Requests
            </p>
            <p className="moreInfoRight">3</p>
            <p className="moreInfoLeft">
              <i class="fas fa-guitar"></i>Accepted Requests
            </p>
            <p className="moreInfoRight">2</p>
            <p className="moreInfoLeft">
              <i class="fas fa-dollar-sign"></i>Base Price
            </p>
            <p className="moreInfoRight">
              AUD {bandProfile.description.bandPrice}
            </p>
          </div>
        </div>
      </div>
      {/* <p>{band.username}</p> */}
    </div>
  );
};

export default BandDashBoard;
