import React from "react";
import { useEffect } from "react";
import Performance from "./Performance"
import "./bandProfile.css"
const PerformanceList = ({videos}) => {
    useEffect(()=>{
    },[videos])
  return (
    <div className="performanceListContainer">
      {videos.length===0?<h5>The band hasn't upload videos yet <i style={{color:"red"}} class="fas fa-window-close"></i></h5>:<></>}
      {videos.map(vdo=><Performance vdoUrl={vdo.vdoUrl} vdoTitle={vdo.vdoTitle} vdoDes={vdo.vdoDescription}/>)}
      
    </div>
  );
};

export default React.memo(PerformanceList);
