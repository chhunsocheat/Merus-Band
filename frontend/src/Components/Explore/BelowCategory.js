import React from "react";
import "./belowCategory.css";
import rightImage from "../../css/rock-radio.jpg";
import { Popup, Button } from "semantic-ui-react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
const BelowCategory = ({ client }) => {
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
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="belowCategoryContainer">
        <div className="leftGrid">
          <p style={{ fontWeight: "700" }}>
            Hello,<span></span> {client.username}
          </p>
          <p>Get offers from people who want to see you perform</p>
          {loginBandState === true ?
            <Button
              basic color="green" onClick={() => {
                history.push(`/bookband/${band.username}`)
              }}>Expand Your Band</Button>
            :
            <Popup
              content='You need to sign in first'
              on='click'
              pinned
              trigger={
                <Button
                  onClick={() => {
                    history.push(`/`)
                  }}
                  basic color="green" content='Explore The Site'
                />}
            />
          }

        </div>
        <div className="img-below-container">
          <img src={rightImage} alt="" />
          <div className="top-left">
            <h3 style={{ fontWeight: "700" }}>Hire Your Dream Band</h3>
            <p>The platform that offer you the perfect </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BelowCategory;
