import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../store/appContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

const CreateCaseModal = ({ handleReload }) => {
  const [visible, setVisible] = useState(false);
  const { actions } = useContext(Context);

  const [customerList, setCustomerList] = useState([]);
  const [professionalList, setProfessionalList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [category, setCategory] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [initialNotes, setInitialNotes] = useState("");
  const [description, setDescription] = useState("");
  //const [isDisabled, setIsDisabled] = useState(true);

  const getData = async () => {
    const customerList = await actions.getAll("customer", "0", "0");
    if (customerList.ok) {
      setCustomerList(customerList.data);
    }

    const professionalList = await actions.getAll("professional", "0", "0");
    if (professionalList.ok) {
      setProfessionalList(professionalList.data);
    }

    const serviceType = await actions.getAll("tables/type");
    if (serviceType.ok) {
      setServiceTypeList(serviceType.data);
    }

    const categoryList = await actions.getAll("category", "0", "0");
    if (categoryList.ok) {
      setCategoryList(categoryList.data);
      console.log(categoryList);
    }
  };

  const handleSave = async () => {
    const fields = {
      customer_id: customer.id, // obligatorio
      category_id: category.id, // obligatorio
      typeservice_id: serviceType.id, // obligatorio
      professional_id: professional.id ? professional.id : null,
      is_active: isActive,
      initial_note: initialNotes,
      description: description,
    };

    const response = await actions.insertInTable("case", fields);
    console.log(response);
    if (response.ok) {
      toast("Caso creado");
      setVisible(false);
      handleReload();
    } else {
      toast(response.error);
    }
  };

  const footer = (
    <div>
      <Button
        label="Crear caso"
        rounded
        size="small"
        onClick={() => handleSave()}
      />
      <Button
        label="Cancelar"
        rounded
        size="small"
        onClick={() => setVisible(false)}
      />
    </div>
  );

  useEffect(() => {
    getData();
  }, []);

  // console.log(customer && customer.id);
  return (
    <>
      <Button
        label="Nuevo caso"
        rounded
        icon="fa-solid fa-circle-plus"
        size="small"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Nuevo Caso"
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => setVisible(false)}
        footer={footer}
      >
        <div className="flex flex-column gap-5 p-4">
          <div className="flex flex-wrap gap-5 w-full justify-content-between">
            <div className="flex flex-column gap-3 ">
              <span className="text-md">Cliente :</span>
              <Dropdown
                value={customer}
                onChange={(e) => {
                  setCustomer(e.value);
                }}
                options={customerList}
                optionLabel="name"
                placeholder="Selecciona un cliente"
                className="w-full md:w-20rem"
              />
            </div>

            <div className="flex flex-column gap-3 ">
              <span className=" text-md">Profesional :</span>
              <Dropdown
                value={professional}
                onChange={(e) => {
                  setProfessional(e.value);
                }}
                options={professionalList}
                optionLabel="name"
                placeholder="Selecciona un Profesional"
                className="w-full md:w-20rem"
              />
            </div>

            <div className="flex flex-column gap-3">
              <span className="text-md">Tipo de servicio :</span>
              <Dropdown
                value={serviceType}
                onChange={(e) => {
                  setServiceType(e.value);
                }}
                options={serviceTypeList}
                optionLabel="type_service"
                placeholder="Selecciona un servicio"
                className="w-full w-min md:w-15rem "
              />
            </div>

            <div className="flex flex-column gap-3 ">
              <span className="text-md">Categoria :</span>
              <Dropdown
                value={category}
                onChange={(e) => {
                  setCategory(e.value);
                }}
                options={categoryList}
                optionLabel="category"
                placeholder="Selecciona una categoria"
                className="w-full md:w-20rem"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 w-full justify-content-between">
            <div className="flex flex-column gap-3">
              <label htmlFor="">Notas iniciales</label>
              <InputTextarea
                value={initialNotes}
                onChange={(e) => setInitialNotes(e.target.value)}
                rows={5}
                cols={45}
                className="w-full"
              />
            </div>
            <div className="flex flex-column gap-3">
              <label htmlFor="">Descripcion</label>
              <InputTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={45}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateCaseModal;

/* 
customer_id
category_id
typeservice_id
professional_id
is_active
initial_note
description
*/
