import React from "react";

const ProfessionalData = () => {
  return (
    <>
      <section className="flex flex-column gap-3">
        <label htmlFor="professionalData">Profesional asignado</label>
        <div
          id="professionalData"
          className="grid justify-content-between surface-300 py-5 px-4  border-round-md 	"
        >
          <div className="col flex flex-column">
            <span className="text-sm">Nombre del profesional :</span>
            <p className="text-lg	font-bold">Kevin pacheco</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Numero de contacto :</span>
            <p className="text-lg font-bold">+00 000 00 00</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Correo electronico :</span>
            <p className="text-lg	font-bold">example@example.com</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Profesion :</span>
            <p className="text-lg	font-bold">Ingeniero</p>
          </div>
          <div className="col flex flex-column">
            <span className="text-sm">Rif :</span>
            <p className="text-lg	font-bold">0000-0000-000</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfessionalData;
