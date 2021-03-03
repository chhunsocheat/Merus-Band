import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
  let { username } = useParams();
  const user = useSelector((state) => {
    return state.user;
  });
    return (
        <div>
             <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="userProfileContainer">
        <div className="bandLeft">
          <div className="bandLeftUpper">
            <img src={user.userImg} alt="" />
    <h3>{user.username}</h3>
            <div>Looking for Rock band</div>
            <div><i class="fas fa-flag"></i>Report</div>
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
            <p
             
            >
             English
            </p>
          </div>
        </div>
       
      </div>
    </div>
        </div>
    );
};

export default UserProfile;