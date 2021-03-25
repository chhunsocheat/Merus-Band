import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "semantic-ui-react";

import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';

import { initBand } from "../../reducers/rootreducer";
import axios from "axios";
import { storage } from "../../Firebase/init.js";
//
const BandDashBoard = () => {
  //Upload Styling
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }));
  const classes = useStyles();
  //History Route
  const dispatch = useDispatch();
  const history = useHistory();

  //Component's State
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
  const [userImagePost, setUserImagePost] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [userImagePostUrl, setUserImagePostUrl] = useState(band.userImg);
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

  //function to upload the profile of the user

  const fileUploadHandler = async (e) => {
    //(e.target.files[0]);
    let userImagePost = e.target.files[0];
    setUserImagePost(e.target.files[0]);
    console.log(userImagePost);
    if (userImagePost === "") {
      console.error(
        `not an image, the image file is a ${typeof userImagePost}`
      );
    }
    const uploadTask = storage
      .ref(`/profile/${userImagePost.name}`)
      .put(userImagePost);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setUploadProgress(progress);
        //takes a snap shot of the process as it is happening
        //(snapshot)
      },
      (err) => {
        //catches the errors

        console.log(err);
      },
      () => {
        setUploadProgress(null);
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("profile")
          .child(userImagePost.name)
          .getDownloadURL()
          //here fireBaseUrl is the url returned by the firebase storage to upload the user profile
          .then(async (fireBaseUrl) => {
            setUserImagePostUrl(fireBaseUrl);
            let updatedUser = await axios.post(
              "http://localhost:3001/moredetail/changeprofile",
              { username: band.username, profileUrl: fireBaseUrl }
            );
            dispatch(initBand({ ...band, userImg: fireBaseUrl }));
            setUserImagePostUrl(fireBaseUrl);
            setUploadProgress(null);
          });
      }
    );
  };
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
    <div style={{ marginTop: "60px" }}>
      <div className="bandLeft">
        <div className="bandLeftUpper">
        <Avatar style={{margin:"auto"}} alt="Remy Sharp" src={userImagePostUrl} className={classes.large} />

          <h3>{band.username}</h3>
          {uploadProgress === null ? (
            <></>
          ) : (
            <LinearProgress variant="determinate" value={uploadProgress} />
          )}
          <p> {bandProfile.description.bandTitle}</p>
          <Rating icon="star" maxRating={5} defaultRating={4} clearable />

          <div style={{ color: "rgb(124,124,125)" }}>
            <i class="fas fa-flag"></i>Report
          </div>

          {/* New Upload Button */}
          <div className={classes.root}>
            <input
              onChange={fileUploadHandler}
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>

          <Button
            style={{ margin: "30px 0px" }}
            color="green"
            onClick={() => {
              history.push(`/band/${band.username}`);
            }}
          >
            <i class="fas fa-eye"></i> View As Public
          </Button>
          <div className="bandLeftButton">
            <Button color="red" onClick={addPerformances}>
              <i class="fab fa-youtube"></i>
              Upload Your Performances
            </Button>
            <Button color="green" onClick={addDetail}>
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
    </div>
  );
};

export default BandDashBoard;
