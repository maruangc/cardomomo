import React from "react";

const StateDetail = () => {
  return (
    <section className="flex flex-column gap-3 ">
      <label htmlFor="StateDetail">Detalles del caso</label>
      <div className="flex flex-column surface-300 py-5 px-4 border-round-md gap-3 ">
        <div className="grid">
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del cliente :</span>
            <p className="text-lg	font-bold">Kevin pacheco</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del cliente :</span>
            <p className="text-lg	font-bold">Kevin pacheco</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del cliente :</span>
            <p className="text-lg	font-bold">Kevin pacheco</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del cliente :</span>
            <p className="text-lg	font-bold">Kevin pacheco</p>
          </div>
        </div>
        <div className="grid gap-5 mt-3">
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del cliente :</span>
            <p className="text-sm w-9 line-height-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Excepturi expedita sequi eveniet id natus, illum veniam distinctio
              aspernatur earum aliquid dignissimos quisquam! Nulla sint facere,
              maxime provident itaque quo iste.
            </p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del cliente :</span>
            <p className="text-sm w-9 line-height-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Excepturi expedita sequi eveniet id natus, illum veniam distinctio
              aspernatur earum aliquid dignissimos quisquam! Nulla sint facere,
              maxime provident itaque quo iste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateDetail;
