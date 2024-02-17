import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
      register: async (e) => {
        const resp = await fetch(process.env.BACKEND_URL + "user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        });
        const data = await resp.json();
        if (data.error) {
          toast(data.error);
          return;
        }
        toast(data.data);
        return data;
      },
      login: async (e) => {
        const resp = await fetch(process.env.BACKEND_URL + "user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        });
        const data = await resp.json();
        if (data.error) {
          toast(data.error);
          return;
        }
        localStorage.setItem("token", data.token);
        return data;
      },
      insertTable: async (table, fields) => {
        const resp = await fetch(
          process.env.BACKEND_URL + "/" + table + "/new",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fields),
          }
        );
        const data = await resp.json();
        if (data.error) {
          toast(data.error);
        }
        return data;
      },
      getById: async (table, id) => {
        if (table == "typeservice") {
          table = "tablas/type";
        }
        if (table == "status") {
          table = "tablas/status";
        }
        const resp = await fetch(
          process.env.BACKEND_URL + "/" + table + "/" + id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await resp.json();
        if (data.error) {
          toast(data.error);
        }
        console.log("flux: ", data);
        return data;
      },
    },
  };
};

export default getState;
