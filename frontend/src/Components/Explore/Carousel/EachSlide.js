import React from "react";
import rightImage from "../../../image/rock-radio.jpg";
import { useHistory } from "react-router-dom";

const EachSlide = ({ band }) => {
  //band prop has been pass from the parent component(MultiSlide.js)
  const history = useHistory();
  return (
    <div className="img-container">
      <a href={`band/${band.username}`}>
        <img className="img-slide" src={rightImage} style={{ width: "100%" }} />
      </a>
      <div style={{ padding: "10px" }}>
        <div className="userInfo-container">
          <a href={`band/${band.username}`}>
            <img className="img-slide-pf" src={band.userImg} />
          </a>

          <div className="slide-pf-info">
            <a style={{textDecoration:"none",color:"black"}} href={`band/${band.username}`}>
              <p className="slide-pf-info-first">{band.username}</p>
            </a>

            <p style={{ color: "#B2B2B2" }}>{band.genre[0]}</p>
          </div>
        </div>
        <div style={{ fontWeight: "400", marginTop: "20px" }}>
          <p style={{ fontWeight: "700" }}>{band.description.bandTitle}</p>

          <p>{band.description.bandDescription}</p>
          <p
            style={{ borderBottom: "1px solid #b2b2b2", paddingBottom: "10px" }}
          >
            <i style={{ color: "#FFBF00" }} class="fas fa-star"></i>4.5 (20)
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <button
            onClick={() => {
              history.push(`/band/${band.username}`);
            }}
            className="btnMe mt-3"
          >
            View
          </button>
          <p style={{ marginTop: "auto" }}>{band.price}</p>
        </div>
      </div>
    </div>
  );
};

export default EachSlide;
