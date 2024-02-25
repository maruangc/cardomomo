import React from "react";
import ListComponent from "../common/components/ListComponent.jsx";

const columns = [
  { field: "id", header: "id" },
  { field: "identification", header: "Identificacion" },
  { field: "name", header: "Nombre" },
  { field: "phone", header: "Telefono" },
  { field: "email", header: "Email" },
  { field: "address", header: "Direccion" },
];

const columnFilter = [
  { field: "identification", header: "Identificacion" },
  { field: "name", header: "Nombre" },
  { field: "phone", header: "Telefono" },
  { field: "email", header: "Email" },
  { field: "address", header: "Direccion" },
];

const initialFieldsValues = {
  identification: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

const CustomerList = () => {
  return (
    <ListComponent
      initialFieldsValues={initialFieldsValues}
      table="customer"
      columns={columns}
      columnFilter={columnFilter}
    />
  );
};
export default CustomerList;

/*
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState();
  const [elementSelected, setElementSelected] = useState();
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [count, setCount] = useState(0);
  const [filtered, setFiltered] = useState(0);
  const [filterFields, setFilterFields] = useState(initialFieldsValues);

  const getCustomers = async (offset = 0) => {
    let response;
    if (filtered === 0) {
      response = await actions.getAll("customer", 10, offset);
    } else {
      response = await actions.getFilter("customer", filterFields, 0, offset);
    }
    if (response.ok) {
      setCustomers(response.data);
      setCount(response.count);
      setRows(10);
    }
    setFilterFields(initialFieldsValues);
  };

  const header = (
    <div className="flex flex-row justify-content-between">
      <CustomerFilter
        setFiltered={setFiltered}
        filtered={filtered}
        setFilterFields={setFilterFields}
        filterFields={filterFields}
        initialFieldsValues={initialFieldsValues}
      />
    </div>
  );

  useEffect(() => {
    getCustomers();
  }, [filtered]);

  return (
    <div className=" max-container-width mx-auto">
      <DataTable
        value={customers}
        header={header}
        stripedRows
        selectionMode="single"
        selection={elementSelected}
        onSelectionChange={(e) => navigate("/customer/detail/" + e.value.id)}
        // scrollable scrollHeight="70vh"
      >
        {columns.map((col) => {
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable
            />
          );
        })}
      </DataTable>
      <Paginator
        template={{ layout: "PrevPageLink PageLinks NextPageLink" }}
        first={first}
        rows={rows}
        page={page}
        totalRecords={count}
        onPageChange={(e) => {
          console.log(e);
          setPage(e.page);
          setRows(e.rows);
          setFirst(e.first);
          getCustomers(e.first);
        }}
      />
    </div>
  );
};
*/
