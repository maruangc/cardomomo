import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Delete from "../common/components/Delete.jsx";
import EditData from "../common/components/EditData.jsx";
import { Card } from "primereact/card";
import CustomerCasesView from "./CustomerCasesView.jsx";

const CustomerDetails = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [reload, setReload] = useState(0);
  const [dataQuery, setDataQuery] = useState();
  const [fields, setFields] = useState([]);

  const getDataQuery = async () => {
    const response = await actions.getById("customer", params.id);
    if (response.msg) {
      toast.error("token expired");
      navigate("/login");
    }
    if (response.ok) {
      setDataQuery(response.data);
      const responseArray = [
        {
          field: "name",
          header: "Nombre",
          value: response.data.name,
        },
        {
          field: "identification",
          header: "Identificación",
          value: response.data.identification,
        },
        {
          field: "phone",
          header: "Telefono",
          value: response.data.phone,
        },
        {
          field: "email",
          header: "Correo",
          value: response.data.email,
        },
        {
          field: "address",
          header: "Dirección",
          value: response.data.address,
        },
        {
          field: "comment",
          header: "Comentario",
          value: response.data.comment,
        },
      ];
      setFields(responseArray);
    }
  };

  useEffect(() => {
    getDataQuery();
  }, [reload]);

  return (
    <div className="w-full flex justify-content-center">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
        <div className="flex gap-5 justify-content-between">
          <div className="flex gap-5 ">
            <Button
              label="Volver"
              icon="fa-solid fa-arrow-left"
              onClick={() => navigate("/customer")}
              rounded
            />
            <Button
              label="Actuallizar"
              icon="fa-solid fa-rotate-right"
              onClick={() => setReload(reload + 1)}
              rounded
            />
          </div>
          <div className="flex gap-5 justify-content-end">
            <EditData
              fields={fields}
              setFields={setFields}
              reload={reload}
              setReload={setReload}
              table="customer"
              id={params.id}
            />
            <Delete table={"customer"} id={params.id} />
          </div>
        </div>
        {dataQuery ? (
          <Card className="surface-300 text-black-alpha-90 p-3 mt-5 border-round-md">
            <div className="flex gap-3">
              <label className="w-2">Id de cliente:</label>
              <label className="w-max">{params.id}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="name">
                Nombre
              </label>
              <label className="w-max">{dataQuery.name}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="identification">
                Identificación
              </label>
              <label className="w-max">{dataQuery.identification}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="phone">
                Telefono
              </label>
              <label className="w-max">{dataQuery.phone}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="email">
                Correo
              </label>
              <label className="w-max">{dataQuery.email}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="address">
                Dirección
              </label>
              <label className="w-max">{dataQuery.address}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="comment">
                Comentario
              </label>
              <label className="w-10">{dataQuery.comment}</label>
            </div>
          </Card>
        ) : (
          <p>Obteniendo Datos...</p>
        )}
        <CustomerCasesView id={params.id} />
      </div>
    </div>
  );
};

export default CustomerDetails;
