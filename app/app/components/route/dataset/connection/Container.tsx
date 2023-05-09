"use client";
import DataTable from "@/components/table/DataTable";
import DatasetAdd from "@/components/route/dataset/connection/Add";

export default function Page({ lng, rows, columns }) {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-2/3">
          {" "}
          <DataTable
            lng={lng}
            rows={rows}
            columns={columns}
            cntx="connection"
          />
        </div>
        <div className="basis-1/3">
          <DatasetAdd lng={lng} />
        </div>
      </div>
    </>
  );
}
