import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const FilterDrop = ({ header }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div className="card flex justify-content-start">
      <Dropdown
        // value={selectedCity}
        onChange={(e) => {
          console.log(e.value);
        }}
        options={cities}
        optionLabel="name"
        placeholder={header}
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default FilterDrop;
