"use client";
import MUIDataTable from "mui-datatables";

export default function DataTable({ rows, columns }): JSX.Element {
  const options = {
    search: true,
    download: true,
    viewColumns: true,
    print: false,
    selectableRows: false,
    filter: true,
    filterType: "dropdown",
    tableBodyHeight: "400px",
  };

  return (
    <>
      <MUIDataTable data={rows} columns={columns} options={options} />
    </>
  );
}
