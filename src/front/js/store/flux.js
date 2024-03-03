import { data } from "jquery";
import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: { refreshKpi: 0 },
    actions: {
      /* utilitarias  */

      /* mostrar horas y minutos y segundos */

      getDate: (date) => {
        const fecha = new Date(date);

        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();

        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();

        const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}`;

        return fechaFormateada;
      },

      /* Peticiones  */

      register: async (e) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/user/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e),
          });
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          } else {
            toast.success(data.data);
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion register(${e}):`, error);
        }
      },
      login: async (e) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e),
          });
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          } else {
            localStorage.setItem("token", data.token);
            toast.success("Acceso concedido");
            return data;
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion login(${e}):`, error);
        }
      },
      insertInTable: async (table, fields) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/new",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(fields),
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(
            `Error en funcion insertTable(${table}, ${fields})`,
            error
          );
        }
      },
      updateById: async (table, id, fields) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/edit/" + id,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(fields),
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(
            `Error en funcion updateTable(${table}, ${id}, ${fields})`,
            error
          );
        }
      },
      setEstate: async (id, fields) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/case/setstate/" + id,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(fields),
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion setState(${id}, ${fields})`, error);
        }
      },
      deleteById: async (table, id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/DELETE/" + id,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion deleteById(${table}, ${id}):`, error);
        }
      },
      getById: async (table, id) => {
        try {
          const store = getStore();
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
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion getById(${table}, ${id}):`, error);
        }
      },
      getFilter: async (table, fields, limit, offset) => {
        // http://127.0.0.1:3001/customer/all/?limit=1&offset=1
        let urlextend = "?limit=0&offset=0";
        if (limit > 0) {
          urlextend = `?limit=${limit}&offset=${offset}`;
        }
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/filter/" + urlextend,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(fields),
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(
            `Error en funcion getFilter(${table}, ${fields}, ${limit}, ${offset})`,
            error
          );
        }
      },
      getAll: async (table, limit, offset) => {
        let urlextend = "?limit=0&offset=0";
        if (limit > 0) {
          urlextend = `?limit=${limit}&offset=${offset}`;
        }
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/all/" + urlextend,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(
            `Error en funcion getAll(${table}, ${limit}, ${offset})`,
            error
          );
        }
      },
      getSummary: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/case/summary", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion getSummary() `, error);
        }
      },
      getCasesFor: async (table, id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/cases/" + id,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await resp.json();
          if (!data.ok) {
            toast.error(data.error);
          }
          return data;
        } catch (error) {
          console.log(`Error en funcion getCasesFor() `, error);
        }
      },
      setRefreshKpi: () => {
        const store = getStore();
        setStore({ refreshKpi: store.refreshKpi + 1 });
      },
      getalldata: async () => {
        const a = await getActions().login({
          email: "maruands@hotmail.com",
          password: "12345",
        });
        const s = await getActions().updateById("case", 1, {
          close_description: "Hi this is a Hola dhjhds",
        });
        console.log("s: ", s);
      },
    },
  };
};

export default getState;
