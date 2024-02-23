import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import GeneralFooter from "./GeneralFooter.jsx";
export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const menuLeft = useRef(null);
  const menuRight = useRef(null);
  const toast = useRef(null);

  const borrarToken = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items = [
    {
      label: "Documents",
      items: [
        {
          label: "New",
          icon: (
            <i className="text-black-alpha-90 mr-2 font-bold fa-solid fa-plus"></i>
          ),
        },
        {
          label: "Search",
          icon: (
            <i className="text-black-alpha-90 mr-2 font-bold fa-solid fa-magnifying-glass"></i>
          ),
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          label: "Settings",
          icon: (
            <i className="text-black-alpha-90 mr-2 font-bold fa-solid fa-gear"></i>
          ),
        },
        {
          label: (
            <p className=" p-0 m-0" onClick={borrarToken}>
              Logout
            </p>
          ),
          icon: (
            <i className="text-black-alpha-90 mr-2 font-bold fa-solid fa-power-off  "></i>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <>
      <div className="card flex justify-content-between align-items-center text-white-alpha-90 bg-primary-900 border-bottom-1 border-primary-500 px-4">
        <div>
          <Button
            className="bg-primary-900 flex justify-content-center align-items-center border-primary-900 font-bol"
            onClick={() => setVisible(true)}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </Button>
          <Sidebar
            header="Menu"
            className="p-0 m-0 text-white-alpha-90 bg-primary-900"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <div className="w-full">
              <Button
                className="w-full bg-primary-900 border-none border-primary-500 border-bottom-1 border-top-1 mb-4 mt-2 text-white font-bold"
                onClick={() => navigate("/customer")}
              >
                Lista clientes
              </Button>
            </div>
            <div className="w-full">
              <Button
                className="w-full bg-primary-900 border-none border-primary-500 border-bottom-1 border-top-1  mb-4 text-white font-bold"
                onClick={() => navigate("/customer/detail")}
              >
                Detalles casos
              </Button>
            </div>
            <div className="w-full">
              <Button
                className="w-full bg-primary-900 border-none border-primary-500 border-bottom-1 border-top-1 mb-4 text-white font-bold"
                onClick={() => navigate("/professional/detail")}
              >
                Detalles profesionales
              </Button>
            </div>
            <hr className="my-4" />
          </Sidebar>
        </div>

        <h2 className="text-center text-2xl text-white">Vista de casos</h2>

        <div className="flex">
          <div className="card">
            <Toast ref={toast}></Toast>
            <Menu
              model={items}
              popup
              ref={menuRight}
              id="popup_menu_right"
              popupAlignment="right"
            />
            <Button
              className="bg-primary-900  border-primary-900 text-white font-bold"
              onClick={(event) => menuRight.current.toggle(event)}
              aria-controls="popup_menu_right"
              aria-haspopup
            >
              <i class="fa-solid fa-user mr-2 text-xl"></i> User
            </Button>
          </div>
        </div>
      </div>
      <Outlet />
      <GeneralFooter />
    </>
  );
}
