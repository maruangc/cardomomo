import React from "react";

const CostumerData = () => {
  return (
    <section className="flex flex-column gap-3 ">
      <label htmlFor="clientData"> Datos del cliente</label>
      <div
        id="clientData"
        className="grid justify-content-between surface-300 py-5 px-4 border-round-md "
      >
        <div className=" col flex flex-column ">
          <span className="text-sm">Nombre del cliente :</span>
          <p className="text-lg	font-bold">Kevin pacheco</p>
        </div>
        <div className=" col flex flex-column">
          <span className="text-sm">Numero de contacto :</span>
          <p className="text-lg	font-bold">+00 000 00 00</p>
        </div>
        <div className=" col flex flex-column">
          <span className="text-sm">Correo electronico :</span>
          <p className="text-lg	font-bold">example@example.com</p>
        </div>
        <div className=" col flex flex-column">
          <span className="text-sm">Direccion :</span>
          <p className="text-lg	font-bold">
            Pais , ciudad , calle , casa , numero
          </p>
        </div>
        <div className=" col flex flex-column">
          <span className="text-sm">Rif :</span>
          <p className="text-lg	font-bold">0000-0000-000</p>
        </div>
      </div>
    </section>
  );
};

export default CostumerData;
