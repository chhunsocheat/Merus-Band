import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button,Rating } from 'semantic-ui-react'
import axios from "axios";
import { storage } from "../../Firebase/init.js"
const BandDashBoard = () => {
  //History Route
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
  const [userImagePost, setUserImagePost] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [userImagePostUrl, setUserImagePostUrl] = useState(band.userImg)
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
    setUserImagePost(e.target.files[0])
    //("upload");
    if (userImagePost === '') {
      console.error(`not an image, the image file is a ${typeof (userImagePost)}`)
    }
    const uploadTask = storage.ref(`/profile/${userImagePost.name}`).put(userImagePost)
    uploadTask.on('state_changed',
      (snapshot) => {
        let progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        setUploadProgress(`${progress}%...`)
        //takes a snap shot of the process as it is happening
        //(snapshot)
      }, (err) => {
        //catches the errors

        //(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('profile').child(userImagePost.name).getDownloadURL()
        //here fireBaseUrl is the url returned by the firebase storage to upload the user profile
          .then(fireBaseUrl => {
            // setUserImagePostUrl(fireBaseUrl)
            // let updatedUser = axios.post("https://twitter-clone-backend123.herokuapp.com/users/changeprofile",
            //   { username: mainuser.username, profileUrl: fireBaseUrl })
            // dispatch(initUser({ ...mainuser, userImg: fireBaseUrl }))
            // setUserImagePostUrl(fireBaseUrl)
            // setUploadProgress(null)
          })
      })

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

          <img src={band.userImg} alt="" />
          <h3>{band.username}</h3>
          <p> {bandProfile.description.bandTitle}</p>
          <Rating icon='star' maxRating={5} defaultRating={4} clearable />

          <div style={{color:"rgb(124,124,125)"}}><i class="fas fa-flag"></i>Report</div>
          <div className="upload-container">
                {/* <input className="upload" type="file" name="" onChange={fileUploadHandler} /> */}
                <input
                  onChange={fileUploadHandler}
                  type="file"
                  name="file-input"
                  id="file-input"
                  className="file-input__input upload"
                />
                <label className="file-input__label" for="file-input">
                  <i className="fas fa-plus" style={{ cursor: "pointer" }}></i>
                </label>
              </div>
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

    </div>
  );
};

export default BandDashBoard;
