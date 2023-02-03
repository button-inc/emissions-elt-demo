"use client";
import MUIDataTable from "mui-datatables";

export default function DataTable({ rows, columns, cntx }): JSX.Element {
  let opts = {};
  switch (cntx) {
    case "imported":
      const handleRowClick = (rowData) => {
        window.location.assign(window.location + "/" + rowData[0]);
      };
      opts = { onRowClick: handleRowClick };
      break;
    default:
      opts = {};
      break;
  }

  const handleCellClick = (cellMeta, colData) => {
    console.log("cellMeta: " + cellMeta);
    console.log("colData.colIndex: " + colData.colIndex);
    console.log("colData.rowIndex: " + colData.rowIndex);
    console.log("rows: " + rows[colData.rowIndex].fileName);
    const name = rows[colData.rowIndex].fileName;
    if (colData.colIndex === 4) {
      window.location.assign(
        "dataTableConfig?name=" + encodeURIComponent(name)
      );
    }
  };

  const columnsEdit = [
    ...columns,
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: () => <div>Edit</div>,
      },
    },
  ];

  const dataEdit = rows.map((row) => {
    return { ...row, Edit: "Edit" };
  });

  const options = {
    ...opts,
    search: true,
    download: true,
    viewColumns: true,
    print: false,
    filter: true,
    filterType: "dropdown",
    tableBodyHeight: "400px",
    selectableRows: "none",
    onCellClick: handleCellClick,
  };

  return (
    <>
      <MUIDataTable data={dataEdit} columns={columnsEdit} options={options} />
    </>
  );
}
