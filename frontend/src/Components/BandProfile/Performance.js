import React, { useEffect } from "react";
import { useState } from "react";
import "./bandProfile.css";
const Performance = ({ vdoUrl, vdoDes, vdoTitle }) => {
  const [youtubeId, setYoutubeId] = useState(youtube_parser(vdoUrl));
/**
 * Function to find the youtube id of a video
 * @param {String} url 
 */
  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
  useEffect(()=>{
    setYoutubeId(youtube_parser(vdoUrl))
  })
  return (
    <div className="performanceContainer">
      <div className="vdoWrapper">
        <iframe
          width="380"
          height="213"
          //   style={{width:"260px"}}
          className="responsive-iframe"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="performanceContainerLower">
        <h2 style={{ fontWeight: "700" }} className="performanceDes">{vdoTitle}</h2>
        <p className="performanceContainerLowerP">{vdoDes}</p>
      </div>
    </div>
  );
};

export default React.memo(Performance);
