import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
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
    },
  };
};

export default getState;
