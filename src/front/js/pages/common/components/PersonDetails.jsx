import React from "react";

const PersonDetails = ({ data }) => {
  return (
    <div className="flex flex-column gap-3">
      <label htmlFor="personData">Detalles de {data.prefix}</label>
      <div className="surface-300 py-5 px-4 border-round-md">
        <div className=" gap-3 ">
          <div className="grid  gap-3 justify-content-between	">
            <div className="col flex flex-column ">
              <span className="text-sm">Nombre del {data.prefix} :</span>
              <p className="text-lg	font-bold">Kevin pacheco</p>
            </div>
            <div className="col flex flex-column ">
              <span className="text-sm">Nombre del {data.prefix} :</span>
              <p className="text-lg	font-bold">Kevin pacheco</p>
            </div>
            <div className="col  flex flex-column ">
              <span className="text-sm">Nombre del {data.prefix} :</span>
              <p className="text-lg	font-bold">Kevin pacheco</p>
            </div>
            <div className="col  flex flex-column ">
              <span className="text-sm">Nombre del {data.prefix} :</span>
              <p className="text-lg	font-bold">Kevin pacheco</p>
            </div>
          </div>

          <div className="flex flex-column gap-2 w- line-height-3">
            <p className="font-medium">Descripcion</p>
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
              nesciunt dolor voluptatibus illo sequi cum perferendis. Error illo
              eos ab possimus, officia, officiis tempora odit ea quam vitae,
              voluptates beatae.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
