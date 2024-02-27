import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import GeneralFooter from "./GeneralFooter.jsx";



export default function Navbar({ vista }) {
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
    <div className="flex flex-column min-h-screen">
      <div className="card flex justify-content-between align-items-center text-white-alpha-90 bg-primary-black px-4">
        <div>
          <Button
            className="flex justify-content-center align-items-center bg-primary-black border-border-primary border-transparent	"
            onClick={() => setVisible(true)}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </Button>
          <Sidebar
            header="Menu"
            className="p-0 m-0 text-white-alpha-90 bg-primary-black"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <div className="flex flex-column gap-3 mt-3">
              <div className="w-full">
                <Button
                  className="w-full bg-primary-black text-white border-transparent "
                  onClick={() => navigate("/case")}
                >
                  Casos
                </Button>
              </div>
              <div className="w-full">
                <Button
                  className="w-full bg-primary-black text-white border-transparent	"
                  onClick={() => navigate("/customer")}
                >
                  Clientes
                </Button>
              </div>

              <div className="w-full">
                <Button
                  className="w-full bg-primary-black text-white border-transparent"
                  onClick={() => navigate("/professional")}
                >
                Profesionales
                </Button>
              </div>
              <div className="w-full">
                <Button
                  className="w-full bg-primary-black text-white border-transparent"
                  onClick={() => navigate("/category")}
                >
                  Categorias
                </Button>
              </div>
            </div>
          </Sidebar>
        </div>

        <h2 className="text-center text-2xl text-white">{vista}</h2>

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
              className="bg-primary-black  border-primary-black text-white font-bold border-transparent	"
              onClick={(event) => menuRight.current.toggle(event)}
              aria-controls="popup_menu_right"
              aria-haspopup
            >
              <i className="fa-solid fa-user mr-2 text-xl"></i> User
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <GeneralFooter />
    </div>
  );
}
