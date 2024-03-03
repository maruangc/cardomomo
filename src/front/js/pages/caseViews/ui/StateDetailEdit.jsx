import React from "react";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";

const StateDetailEdit = ({
  serviceTypeList,
  serviceType,
  setServiceType,
  isActive,
  setIsActive,
  categoryList,
  category,
  setCategory,
  initialNotes,
  setInitialNotes,
  description,
  setDescription,
  dataCase,
  closeNotes,
  setCloseNotes,
  deliveredNotes,
  setDeliveredNotes,
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
        <div className="flex  gap-5 w-full ">
          <div className="flex flex-column gap-3 w-full">
            <label htmlFor="">Notas iniciales</label>
            <InputTextarea
              value={initialNotes}
              onChange={(e) => setInitialNotes(e.target.value)}
              rows={5}
              cols={45}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-3 w-full">
            <label htmlFor="">Descripcion</label>
            <InputTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              cols={45}
              className="w-full"
            />
          </div>
        </div>
        {dataCase.case.closed && (
          <div className="flex flex-column gap-3 w-full">
            <label htmlFor="">Notas de cierre</label>
            <InputTextarea
              value={closeNotes}
              onChange={(e) => setCloseNotes(e.target.value)}
              rows={5}
              cols={45}
              className="w-full"
            />
          </div>
        )}
        {dataCase.case.delivered && (
          <div className="flex flex-column gap-3 w-full">
            <label htmlFor="">Notas de entrega</label>
            <InputTextarea
              value={deliveredNotes}
              onChange={(e) => setDeliveredNotes(e.target.value)}
              rows={5}
              cols={45}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StateDetailEdit;

/* 

*/
