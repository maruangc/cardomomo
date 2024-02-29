import React from "react";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";

const StateDetailEdit = ({
  serviceTypeList,
  serviceType,
  setServiceType,
  isActive,
  setIsActive,
  categoryList,
  category,
  setCategory,
}) => {
  return (
    <div className="flex flex-column gap-3 ">
      <label htmlFor="StateDetail" className="font-bold text-xl">
        Edita los detalles del caso
      </label>
      <div className="flex flex-column p-5 surface-100 border-solid border-2	border-300	border-round-lg	 gap-3 ">
        <div className="grid">
          <div className="col flex flex-column gap-3">
            <span className="text-sm">Tipo de servicio :</span>
            <Dropdown
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.value);
              }}
              options={serviceTypeList}
              optionLabel="type_service"
              placeholder="Selecciona un servicio"
              className="w-full w-min md:w-15rem font-bold "
            />
          </div>

          <div className="col flex flex-column gap-3 ">
            <span className="text-sm">Estado del caso :</span>
            <div className="flex gap-3 w-min align-items-center">
              <span className="font-bold">
                {isActive ? "Activo" : "Inactivo"}
              </span>
              <InputSwitch
                checked={isActive}
                onChange={(e) => setIsActive(e.value)}
              />
            </div>
          </div>

          <div className="col flex flex-column gap-3">
            <span className="text-sm">Categoria del servicio :</span>
            <Dropdown
              value={category}
              onChange={(e) => {
                setCategory(e.value);
              }}
              options={categoryList}
              optionLabel="category"
              placeholder="Selecciona una categoria"
              className="w-full md:w-min  font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDetailEdit;
