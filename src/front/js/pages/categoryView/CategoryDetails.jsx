import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Delete from "../common/components/Delete.jsx";
import EditData from "../common/components/EditData.jsx";
import CategoryCasesView from "./CategoryCasesView.jsx";

const CategoryDetails = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const [reload, setReload] = useState(0);
  const [dataQuery, setDataQuery] = useState();
  const [fields, setFields] = useState([]);

  const getDataQuery = async () => {
    const response = await actions.getById("category", params.id);
    if (response.msg) {
      toast.error("token expired");
      navigate("/login");
    }
    if (response.ok) {
      setDataQuery(response.data);
      const responseArray = [
        {
          field: "category",
          header: "Categoria",
          value: response.data.category,
        },
        {
          field: "description",
          header: "Descripción",
          value: response.data.description,
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
              onClick={() => navigate("/category")}
              rounded
            />
          </div>
          <div className="flex gap-5 justify-content-end">
            <EditData
              fields={fields}
              setFields={setFields}
              reload={reload}
              setReload={setReload}
              table="category"
              id={params.id}
            />
            <Delete table={"category"} id={params.id} />
          </div>
        </div>
        {dataQuery ? (
          <div className="surface-300 p-7 mt-5 border-round-md text-xl">
            <div className="flex gap-3">
              <label className="w-2">Category Id:</label>
              <label className="w-max">{params.id}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="category">
                Categoria
              </label>
              <label className="w-max">{dataQuery.category}</label>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="w-2" htmlFor="description">
                Descripcion
              </label>
              <label className="w-max">{dataQuery.description}</label>
            </div>
          </div>
        ) : (
          <p>Obteniendo Datos...</p>
        )}
        <CategoryCasesView id={params.id} />
      </div>
    </div>
  );
};

export default CategoryDetails;
