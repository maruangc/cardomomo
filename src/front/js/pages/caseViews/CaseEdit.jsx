import React from "react";
import { useParams } from "react-router-dom";

const CaseEdit = () => {
  const { id } = useParams();
  console.log(id);
  return <div>CaseEdit</div>;
};

export default CaseEdit;
