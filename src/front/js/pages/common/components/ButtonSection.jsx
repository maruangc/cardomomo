import React from "react";
import { Button } from "primereact/button";

const ButtonSection = ({ data, btnList }) => {
  return (
    <section className="flex flex-row justify-content-between align-items-center">
      <div>
        <h2>{data.name}</h2>
        <p>{data.create_date}</p>
        {data.state && <p>{data.state}</p>}
      </div>
      <div className="flex gap-5">
        {btnList.map((btn, idx) => (
          <Button
            key={idx + btn.label}
            label={btn.label}
            onClick={btn.click}
            rounded
          />
        ))}
      </div>
    </section>
  );
};

export default ButtonSection;
