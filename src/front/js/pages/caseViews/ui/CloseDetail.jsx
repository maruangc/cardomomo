import React from "react";

const CloseDetail = ({ titulo }) => {
  return (
    <div className="col flex flex-column gap-3">
      <p>{titulo}</p>
      <div className="surface-300 py-5 px-4 border-round-md ">
        <div className="flex flex-row justify-content-between">
          <h3 className="font-medium">Fecha de cierre</h3>
          <p className="text-xl font-bold">00/00/0000</p>
        </div>

        <div className="flex flex-column gap-2 w-9 line-height-3">
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
  );
};

export default CloseDetail;
