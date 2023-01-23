"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// 👇️ define the props sent to DataTable
interface Props<T> {
  rows: T[];
  columns: GridColDef[];
}
export default function DataTable<T>({ rows, columns }: Props<T>): JSX.Element {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        //rowsPerPageOptions={[100]}
        //checkboxSelection
      />
    </div>
  );
}
