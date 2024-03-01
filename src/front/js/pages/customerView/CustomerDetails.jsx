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
          <Card className=" text-black-alpha-90  border-round-md bg-primary-50 shadow-2 ">
            <h5 className=" text-3xl p-0 m-0 ml-3">{dataQuery.name}</h5>

            <div className="grid">
              <div className="col-4 border-right-2 border-primary-500 p-4">
                <div className=" gap-3 flex">
                  <p className="">Id de cliente:</p>
                  <p className="w-max">{params.id}</p>
                </div>
                <div className=" gap-3 flex mt-2">
                  <p className="" htmlFor="identification">
                    Identificación:
                  </p>
                  <p className="w-max">{dataQuery.identification}</p>
                </div>
                <div className=" gap-3 flex mt-2">
                  <p className="" htmlFor="phone">
                    Telefono:
                  </p>
                  <p className="w-max">{dataQuery.phone}</p>
                </div>
              </div>
              <div className="col-8 px-6">
                <div className=" gap-3 flex mt-3">
                  <p className="" htmlFor="email">
                    Correo:
                  </p>
                  <p className="w-max">{dataQuery.email}</p>
                </div>
                <div className=" gap-3 flex mt-2">
                  <p className="" htmlFor="address">
                    Dirección:
                  </p>
                  <p className="w-max">{dataQuery.address}</p>
                </div>
                <div className=" gap-3 flex mt-2">
                  <p className="" htmlFor="comment">
                    Comentario:
                  </p>
                  <p className=" max-w-5 flex flex-wrap">{dataQuery.comment}</p>
                </div>
              </div>
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
