import React from "react";
/* data */

const ProfessionalData = ({ professional }) => {
  const { name, phone, email, carrier, identification } = professional;

  return (
    <>
      <section className="flex flex-column gap-3">
        <label htmlFor="professionalData">Profesional asignado</label>
        <div
          id="professionalData"
          className="grid justify-content-between p-5 surface-100 border-solid	border-2	border-300	border-round-lg"
        >
          {professional.ok != undefined ? (
            <p className="mx-auto m-0">Sin datos de profesional</p>
          ) : (
            <>
              <div className="col flex flex-column">
                <span className="text-sm">Nombre del profesional :</span>
                <p className="text-lg	font-bold">{name}</p>
              </div>
              <div className="col flex flex-column">
                <span className="text-sm">Numero de contacto :</span>
                <p className="text-lg font-bold">{phone}</p>
              </div>
              <div className="col flex flex-column">
                <span className="text-sm">Correo electronico :</span>
                <p className="text-lg	font-bold">{email}</p>
              </div>
              <div className="col flex flex-column">
                <span className="text-sm">Profesion :</span>
                <p className="text-lg	font-bold">{carrier}</p>
              </div>
              <div className="col flex flex-column">
                <span className="text-sm">Rif :</span>
                <p className="text-lg	font-bold">{identification}</p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfessionalData;
