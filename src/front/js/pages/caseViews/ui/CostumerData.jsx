import React from "react";

const CostumerData = ({ customer }) => {
  const { name, phone, email, address, identification } = customer;

  return (
    <section className="flex flex-column gap-3 ">
      <label htmlFor="customerData"> Datos del cliente</label>
      <div
        id="customerData"
        className="grid justify-content-between p-5 surface-100 border-solid border-2	border-300	border-round-lg	"
      >
        {!customer ? (
          <p className="mx-auto m-0">Sin datos de cliente</p>
        ) : (
          <>
            <div className=" col flex flex-column ">
              <span className="text-sm">Nombre del cliente :</span>
              <p className="text-lg	font-bold">{name}</p>
            </div>
            <div className=" col flex flex-column">
              <span className="text-sm">Numero de contacto :</span>
              <p className="text-lg	font-bold">{phone}</p>
            </div>
            <div className=" col flex flex-column">
              <span className="text-sm">Correo electronico :</span>
              <p className="text-lg	font-bold">{email}</p>
            </div>
            <div className=" col flex flex-column">
              <span className="text-sm">Direccion :</span>
              <p className="text-lg	font-bold">{address}</p>
            </div>
            <div className=" col flex flex-column">
              <span className="text-sm">Rif :</span>
              <p className="text-lg	font-bold">{identification}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CostumerData;
