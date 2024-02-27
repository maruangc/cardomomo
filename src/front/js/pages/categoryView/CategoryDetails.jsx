import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Delete from "../common/Delete.jsx";

const CategoryDetails = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();

  const [dataQuery, setDataQuery] = useState();
  const [fields, setFields] = useState({
    category: "",
    description: "",
  });

  const getDataQuery = async () => {
    const response = await actions.getById("category", params.id);
    if (response.msg) {
      toast("token expired");
      navigate("/login");
    }
    if (response.ok) {
      setDataQuery(response.data);
    }
  };

  const editData = async () => {
    getDataQuery();
  };

  useEffect(() => {
    getDataQuery();
  }, []);

  return (
    <div className="w-full flex justify-content-center">
      <div className="flex flex-column gap-5 px-5 py-5 w-full max-container-width">
        <div className="flex gap-5 justify-content-end">
          <Button label="Editar" onClick={() => editData()} rounded />
          <Delete table={"category"} id={params.id} />
        </div>
        {dataQuery ? (
          <div className="surface-300 py-5 px-4 mt-5 border-round-md">
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
          <p>Obteniendo Datos</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
