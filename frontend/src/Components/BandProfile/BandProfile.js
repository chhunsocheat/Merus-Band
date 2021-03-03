import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon,Popup,Button } from "semantic-ui-react";
import { useHistory, useParams } from "react-router-dom"
import "./bandProfile.css";
import Reviews from "./Review/Rewiews"
import PerformanceList from "./PerformanceList";
const BandProfile = () => {
  //getting all the data that needed for the band profile
  let { username } = useParams();
  const history = useHistory()
  const loginState = useSelector((state) => {
    return state.loginState;
  });
  const loginBandState = useSelector((state) => {
    return state.loginBandState;
  });
  const band = useSelector((state) => {
    return state.band;
  });
  const [videos, setVideos] = useState([
    {
      vdoUrl: "",
      vdoDescription: "",
    },
  ]);
  //setting the state of the band
  const [bandProfile, setBandProfile] = useState({
    description: {
      bandTitle: "No title Yet",
      bandDescription: "No Description yet",
      bandPrice: "Not Set",
      genre: ""
    },
  });
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState(0);
  const [ratingNo, setRatingNo] = useState(0);
  const [bandPhoneNumber, setBandPhoneNumber] = useState("Contact Me");
  const [isReveal, setIsReveal] = useState(false);
  // function handleRate(e, { rating, maxRating }) {
  //   //(e);
  //   setRating(rating);
  // }
  /**
   * function to load the band information from the server
   */
  async function loadBand() {
    const bandData = await axios.get(
      `http://localhost:3001/users/${username}`
    );
//setting the information from the server accordingly to the state
    setBandProfile(bandData.data);
    setVideos(bandData.data.videos);
    //average function to calculate for the average value of the band's rating
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    const rating = Math.floor(average(bandData.data.reviews))
    //(rating);
    setRatingNo(bandData.data.reviews.length)
    setRating(rating)
    return bandData;
  }
  useEffect(() => {
    //after loading the data from the server set the state of the component according to the data.
    loadBand().then((res) => {
      const bandData = res.data.description;
      setBandPhoneNumber(bandData.bandPhoneNumber);
      setGenre(res.data.genre[0])
    });
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <div className="bandProfileContainer">
        <div className="bandLeft">
          <div className="bandLeftUpper">
          
            <img src={bandProfile.userImg} alt="" />
            <h3>{bandProfile.username}</h3>
            <p> {bandProfile.description.bandTitle}</p>
            <Icon style={{ color: "gold" }} name="star" />
            <span>{rating}({ratingNo+3})</span>
            <div>report</div>
            <div className="bandLeftButton">
              {isReveal === false ? (
                <Button 
                basic color="green"
                  onClick={() => {
                    setIsReveal((state) => !state);
                  }}
                  className="btnMeBelow"
                >
                  Contact Me
                </Button>
              ) : (
                <Button 
                basic color="green"
                    onClick={() => {
                      setIsReveal((state) => !state);
                    }}
                    className="btnMeBelow"
                  >
                    {bandPhoneNumber}
                  </Button>
                )}
              {loginState || loginBandState === true ?
                <Button 
                basic color="green" onClick={() => {
                  history.push(`/bookband/${bandProfile.username}`)
                }}>Book Band</Button>
                :
                <Popup
                  content='You need to sign in first'
                  on='click'
                  pinned
                  trigger={<Button basic color="green" content='Book Band' />}
                />
              }

            </div>
            <div className="moreInfo">
              <p className="moreInfoLeft">
                <i class="fas fa-map-marker-alt"></i>From
              </p>
              <p className="moreInfoRight">Australia</p>
              <p className="moreInfoLeft">
                <i class="fas fa-users"></i>Members
              </p>
              <p className="moreInfoRight">{band.members}</p>
              <p className="moreInfoLeft">
                <i class="fas fa-user"></i>Member Since
              </p>
              <p className="moreInfoRight">Oct 2020</p>
              <p className="moreInfoLeft">
                <i class="fas fa-guitar"></i>Main Genre
              </p>
              <p className="moreInfoRight">{genre}</p>
              <p className="moreInfoLeft">
                <i class="fas fa-dollar-sign"></i>Base Price
              </p>
              <p className="moreInfoRight">
                AUD {bandProfile.description.bandPrice}
              </p>
            </div>
          </div>
          <div className="description">
            <p>Description</p>
            <p
              style={{
                borderBottom: "1px solid  rgba(0, 0, 0, 0.342)",
                paddingBottom: "20px",
              }}
            >
              {bandProfile.description.bandDescription}
            </p>
            <p>Languages</p>
            <p>English</p>
          </div>
        </div>
        <div className="bandRight">
          <h1>List of performance</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignContent: "center",
            }}
          >
            <PerformanceList videos={videos} />
          </div>
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default BandProfile;
