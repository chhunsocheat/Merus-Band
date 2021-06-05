import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = () => {
  return (
    <div style={{display:"flex",gap:"10px"}}>
        
      <div style={{width:"100%"}}>
        <Skeleton height={100} />
        <Skeleton circle={true} height={50} width={50} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
      <div style={{width:"100%"}}>
        <Skeleton height={100} />
        <Skeleton circle={true} height={50} width={50} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
      <div style={{width:"100%"}}>
        <Skeleton height={100} />
        <Skeleton circle={true} height={50} width={50} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
    </div>
  );
};

export default SkeletonLoader;
