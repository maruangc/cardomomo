import React from "react";
import KpiListItems from "./ui/KpiListItems.jsx";
import CaseListComponent from "./ui/CaseListComponent.jsx";

const CaseList = () => {
  return (
    <div className="w-full flex justify-content-center h-full">
      <div className="flex flex-column gap-5 p-5 w-full max-container-width">
        <KpiListItems />
        <CaseListComponent />
      </div>
    </div>
  );
};

export default CaseList;
