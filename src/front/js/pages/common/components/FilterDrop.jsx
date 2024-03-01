import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

const FilterDrop = ({
  data,
  nameForDropDown,
  field,
  header,
  setFilterFields,
  filterFields,
}) => {
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="card flex justify-content-start">
      <Dropdown
        value={selectedData}
        onChange={(e) => {
          setSelectedData(e.value);
          setFilterFields({
            ...filterFields,
            [field]: e.target.value.id,
          });
        }}
        options={data}
        optionLabel={nameForDropDown}
        placeholder={header}
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default FilterDrop;
