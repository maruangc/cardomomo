import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      dataById: {
        case: {},
        typeservice: {},
        status: {},
        customer: {},
        professional: {},
        category: {},
        user: {},
      },
      dataList: {
        case: [],
        typeservice: [],
        status: [],
        customer: [],
        professional: [],
        category: [],
        user: [],
      },
    },
    actions: {
      /* utilitarias  */

      /* mostrar horas y minutos y segundos */

      getDate: (date) => {
        const fecha = new Date(date);

        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();

        const fechaFormateada = `${dia}/${mes}/${año}`;

        return fechaFormateada;
      },

      /* Peticiones  */

      register: async (e) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e),
          });
          const data = await resp.json();
        } catch (error) {
          console.log(`Error en funcion register(${e}):`, error);
        }
        if (data.error) {
          toast(data.error);
        }
        toast(data.data);
        return;
      },
      login: async (e) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/user/login", {
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
          toast("granted access, token generated");
        } catch (error) {
          console.log(`Error en funcion login(${e}):`, error);
        }
        return;
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
        } catch (error) {
          console.log(
            `Error en funcion insertTable(${table}, ${fields})`,
            error
          );
        }
        if (data.error) {
          toast(data.error);
        }
        return;
      },
      updateById: async (table, id, fields) => {
        try {
          const store = getStore();
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
          if (data.error) {
            toast(data.error);
          }
        } catch (error) {
          console.log(
            `Error en funcion updateTable(${table}, ${id}, ${fields})`,
            error
          );
        }
        return;
      },
      deleteById: async (table, id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/" + id,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await resp.json();
          if (data.error) {
            toast(data.error);
          }
        } catch (error) {
          console.log(`Error en funcion deleteById(${table}, ${id}):`, error);
        }
        return;
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
          if (data.error) {
            toast(data.error);
          }
          setStore({
            ...store,
            dataById: { ...store.dataById, [table]: data },
          });
          console.log(
            store.dataById.customer.data.name,
            store.dataById.customer.data.identification
          );
          table = "customer";
          console.log(store.dataById[table].data.name);
        } catch (error) {
          console.log(`Error en funcion getById(${table}, ${id}):`, error);
        }
        return;
      },
      getFilter: async (table, fields, limit, offset) => {
        // http://127.0.0.1:3001/customer/all/?limit=1&offset=1
        let urlextend = "0";
        if (limit > 0) {
          urlextend = `?limit=${limit}&offset=${offset}`;
        }
        try {
          const store = getStore();
          const resp = await fetch(
            process.env.BACKEND_URL + "/" + table + "/filter/" + urlextend,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(fields),
            }
          );
          const data = await resp.json();
          if (data.error) {
            toast(data.error);
          }
          setStore({
            ...store,
            dataById: { ...store.dataById, [table]: data },
          });
        } catch (error) {
          console.log(
            `Error en funcion getFilter(${table}, ${fields}, ${limit}, ${offset})`,
            error
          );
        }
        return;
      },
      getAll: async (table, limit, offset) => {
        let urlextend = "0";
        if (limit > 0) {
          urlextend = `?limit=${limit}&offset=${offset}`;
        }
        try {
          const store = getStore();
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
          if (data.error) {
            toast(data.error);
          }
          setStore({
            ...store,
            dataById: { ...store.dataById, [table]: data },
          });
        } catch (error) {
          console.log(
            `Error en funcion getAll(${table}, ${limit}, ${offset})`,
            error
          );
        }
        return;
      },
    },
  };
};

export default getState;
