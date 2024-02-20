import React from "react";
import { useParams } from "react-router-dom";

const CaseEdit = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="w-full flex justify-content-center">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width"></div>
    </div>
  );
};

export default CaseEdit;
