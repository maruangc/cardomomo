import React from "react";
import { Skeleton } from "primereact/skeleton";

const SkeletonCase = () => {
  return (
    <>
      <div className="w-full md:w-6 p-3">
        <h5>Rectangle</h5>
        <Skeleton className="mb-2"></Skeleton>
        <Skeleton width="10rem" className="mb-2"></Skeleton>
        <Skeleton width="5rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
    </>
  );
};

export default SkeletonCase;
