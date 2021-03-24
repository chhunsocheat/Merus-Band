import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../Firebase/init.js";
import { initUser } from "../../reducers/rootreducer";
import axios from "axios";
//materialUI
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';

import Button from "@material-ui/core/Button";
const UserProfile = () => {
  const dispatch = useDispatch();
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
  let { username } = useParams();

  const user = useSelector((state) => {
    return state.user;
  });

  //component state
  const [userImagePost, setUserImagePost] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [userImagePostUrl, setUserImagePostUrl] = useState(
    user.userImg
  );
 

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
      .ref(`/userprofile/${userImagePost.name}`)
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
          .ref("userprofile")
          .child(userImagePost.name)
          .getDownloadURL()
          //here fireBaseUrl is the url returned by the firebase storage to upload the user profile
          .then(async (fireBaseUrl) => {
            setUserImagePostUrl(fireBaseUrl);
            let updatedUser = await axios.post(
              "http://localhost:3001/moredetail/changeprofileuser",
              { username: user.username, profileUrl: fireBaseUrl }
            );
            dispatch(initUser({ ...user, userImg: fireBaseUrl }));
            setUserImagePostUrl(fireBaseUrl);
            setUploadProgress(null);
          });
      }
    );
  };
useEffect(()=>{
if(user.userImg===null)setUserImagePostUrl("https://i.stack.imgur.com/34AD2.jpg")
},[])
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="userProfileContainer">
          <div className="bandLeft">
            <div className="bandLeftUpper">
            <Avatar style={{margin:"auto"}} alt="Remy Sharp" src={userImagePostUrl} className={classes.large} />

              <h3>{user.username}</h3>
              {uploadProgress === null ? (
                <></>
              ) : (
                <LinearProgress variant="determinate" value={uploadProgress} />
              )}
              <div>Looking for Rock band</div>
              <div>
                <i class="fas fa-flag"></i>Report
              </div>
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
              <div className="bandLeftButton">
                <button className="btnMeBelow">Contact Me</button>
                <button className="btnMeBelow">Requested</button>
              </div>
              <div className="moreInfo">
                <p className="moreInfoLeft">
                  <i class="fas fa-map-marker-alt"></i>From
                </p>
                <p className="moreInfoRight">Australia</p>
                <p className="moreInfoLeft">
                  <i class="fas fa-user"></i>Member Since
                </p>
                <p className="moreInfoRight">Oct 2020</p>
                <p className="moreInfoLeft">
                  <i class="fas fa-comment"></i>Last Response
                </p>
                <p className="moreInfoRight">2 days</p>
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
                I am looking for a band to perform at my event
              </p>
              <p>Languages</p>
              <p>English</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
