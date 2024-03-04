import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Delete from "../common/components/Delete.jsx";
import EditData from "../common/components/EditData.jsx";
import { Card } from "primereact/card";

const UserDetail = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [reload, setReload] = useState(0);
  const [dataQuery, setDataQuery] = useState();
  const [fields, setFields] = useState([]);

  const getDataQuery = async () => {
    const response = await actions.getById("user", params.id);
    if (response.msg) {
      toast.error("Credencial vencida");
      navigate("/login");
    }
    if (response.ok) {
      setDataQuery(response.data);
      const responseArray = [
        {
          field: "email",
          header: "Correo",
          value: response.data.email,
        },
        {
          field: "name",
          header: "Nombre",
          value: response.data.name,
        },
      ];
      setFields(responseArray);
    }
  };

  const updateUser = async () => {
    const response = await actions.updateById("user", params.id, {
      is_active: true,
    });
    if (response.msg) {
      toast.error("Credencial vencida");
      navigate("/login");
    }
    if (response.ok) {
      toast.success("Usuario ReActivado");
      setReload(reload + 1);
    }
  };

  useEffect(() => {
    getDataQuery();
  }, [reload]);

  return (
    <div className="w-full flex justify-content-center">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width ">
        <div className="flex gap-5 justify-content-between">
          <div className="flex gap-5">
            <Button
              label="Actuallizar"
              icon="fa-solid fa-rotate-right"
              onClick={() => setReload(reload + 1)}
              rounded
            />
            <Button
              label="Volver"
              icon="fa-solid fa-arrow-left"
              onClick={() => navigate("/user")}
              rounded
            />
          </div>
          <div className="flex gap-5 justify-content-end">
            <EditData
              fields={fields}
              setFields={setFields}
              reload={reload}
              setReload={setReload}
              table="user"
              id={params.id}
            />
            {dataQuery ? (
              dataQuery.is_active ? (
                <>
                  <Delete table={"user"} id={params.id} />
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    label="Reactivar"
                    icon="fa-solid fa-recycle"
                    onClick={() => updateUser()}
                    rounded
                  />
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        {dataQuery ? (
          <Card className="text-black-alpha-90  border-round-md bg-primary-50 shadow-2 text-xl px-5">
            <div className="flex gap-3">
              <label className="w-2">User Id:</label>
              <label className="w-max">{params.id}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="description">
                Condición:
              </label>
              <label
                className={
                  !dataQuery.is_active ? "w-max text-red-500" : "w-max"
                }
              >
                {dataQuery.is_active ? "Activo" : "DESACTIVADO"}
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="description">
                Nombre:
              </label>
              <label className="w-max">{dataQuery.name}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="category">
                Correo:
              </label>
              <label className="w-max">{dataQuery.email}</label>
            </div>
          </Card>
        ) : (
          <p>Obteniendo Datos...</p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
