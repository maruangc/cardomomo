import React from "react";
import { Skeleton } from "primereact/skeleton";

const SkeletonCase = () => {
  return (
    <>
      <div className=" mx-auto max-container-width justify-content-center align-item-center">
        <div className=" h-full p-3">
          <Skeleton className="mb-2"></Skeleton>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height="2rem" className="mb-2"></Skeleton>
          <Skeleton width="10rem" height="4rem"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default SkeletonCase;
