"use client";
import MUIDataTable from "mui-datatables";
import { Checkbox } from "@mui/material";

export default function DataTable({ rows, columns, cntx }): JSX.Element {
  // 👇️ used to changes options for calling component
  let opts = {};
  const handleRowClick = (rowData) => {
    window.location.assign(
      window.location + "/" + rowData[0] + "?area=" + rowData[1]
    );
  };

  /*  const handleCellClick = (cellMeta, colData) => {
    console.log("cellMeta: " + cellMeta);
    console.log("colData.colIndex: " + colData.colIndex);
    console.log("colData.rowIndex: " + colData.rowIndex);
    console.log("rows: " + rows[colData.rowIndex].fileName);
    const name = rows[colData.rowIndex].fileName;
    if (colData.colIndex === 4) {
      window.location.assign("dataset/config?name=" + encodeURIComponent(name));
    }
  };
  */

  switch (cntx) {
    case "anonymized":
    case "dlpAnalysis":
      // 👇️ get first quote from quote array for example
      if (rows) {
        rows = rows.map((row) => {
          return {
            ...row,
            quotes: row[0] || "", // Quotes return as object keys rather than an array due to flattening
          };
        });
      }

      // 👇️ change 'to Anonymize?' column to a checkbox
      // Todo: Enable functionality of checkbox (ie. submit back to DB & use for DLP anonymization)
      const toAnonymizeIndex = columns.findIndex(
        (e) => e.name === "toAnonymize"
      );
      columns[toAnonymizeIndex] = {
        ...columns[toAnonymizeIndex],
        options: {
          customBodyRender: (value) => (
            <Checkbox checked={value} disabled size="small" />
          ),
        },
      };
      break;
    case "imported":
      opts = { onRowClick: handleRowClick };
      break;
    case "connection":
      // 👇️ add edit button to columns
      if (!columns.some((e) => e.id === "edit")) {
        columns.unshift({
          id: "edit",
          name: "",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
              return (
                <button onClick={() => console.log(tableMeta)}>Edit</button>
              );
            },
          },
        });
      }
      break;
    default:
      opts = {};
      break;
  }
  // 👇️ DataTable options
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
  console.log(columns);
  // 👉️ RETURN: MUI datatable
  return (
    <>
      <MUIDataTable data={rows} columns={columns} options={options} />
    </>
  );
}
