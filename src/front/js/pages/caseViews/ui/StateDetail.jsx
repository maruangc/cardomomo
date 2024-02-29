import React, { useContext } from "react";
import { Context } from "../../../store/appContext";

const StateDetail = ({ data, statusCase }) => {
  const { actions } = useContext(Context);
  const { typeservice, category } = data;
  const { description, initial_note, date_init } = data.case;

  return (
    <section className="flex flex-column gap-3 ">
      <label htmlFor="StateDetail">Detalles del caso</label>
      <div className="flex flex-column  p-5 surface-100 border-solid border-2	border-300	border-round-lg	 gap-3 ">
        {!data ? (
          <p className="mx-auto m-0">Sin datos de detalle</p>
        ) : (
          <>
            <div className="grid">
              <div className="col flex flex-column">
                <span className="text-sm">Estado :</span>
                <p className="text-lg	font-bold">{statusCase}</p>
              </div>

              <div className="col flex flex-column">
                <span className="text-sm">Tipo de servicio :</span>
                <p className="text-lg	font-bold">{typeservice.type_service}</p>
              </div>
              <div className="col flex flex-column">
                <span className="text-sm">Categoria :</span>
                <p className="text-lg	font-bold">{category.category}</p>
              </div>
              <div className="col flex flex-column ">
                <span className="text-sm">Fecha de inicio:</span>
                <p className="text-lg	font-bold">{actions.getDate(date_init)}</p>
              </div>
            </div>
            <div className="grid gap-5 mt-3">
              <div className="col flex flex-column">
                <span className="text-sm">Notas iniciales :</span>
                <p className="text-sm w-9 line-height-3">{initial_note}</p>
              </div>
              <div className="col flex flex-column">
                <span className="text-sm">Descripcion :</span>
                <p className="text-sm w-9 line-height-3">{description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default StateDetail;
