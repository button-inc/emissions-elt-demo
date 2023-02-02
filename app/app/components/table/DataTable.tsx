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
  };

  return (
    <>
      <MUIDataTable data={rows} columns={columns} options={options} />
    </>
  );
}
