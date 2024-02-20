import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate, Outlet } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const items = [
    {
      label: "Rutas",
      items: [
        {
          label: "detalles casos",
          url: "/detail",
        },
        {
          label: "lista clientes",
          url: "/customer",
        },
        {
          label: "detalles clientes",
          url: "/customer/detail",
        },
        {
          label: "detalles profesionales",
          url: "/professional/detail",
        },
      ],
    },
    {
      label: "Programmatic",
      command: () => {
        navigate("/installation");
      },
    },
  ];

  return (
    <>
      <div className="card">
        <Menubar model={items} />
      </div>
      <Outlet />
    </>
  );
}
