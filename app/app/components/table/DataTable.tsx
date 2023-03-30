"use client";
import MUIDataTable from "mui-datatables";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import DataObjectIcon from "@mui/icons-material/DataObject";
import HubIcon from "@mui/icons-material/Hub";
import { AlliumProvider, Link } from "@telus-uds/ds-allium";

import { useTranslation } from "@/i18n/client";
import { textLabelsEN } from "@/i18n/locales/en/datatable/labels";
import { textLabelsFR } from "@/i18n/locales/fr/datatable/labels";

export default function DataTable({ lng, rows, columns, cntx }): JSX.Element {
  console.log(lng);
  // 👇️ language management
  let { t } = useTranslation(lng, "datatable");

  // 👇️ used to tranaslate the mui-datatable text, tooltips, etc.
  const textLabels = lng === "fr" ? textLabelsFR : textLabelsEN;

  // 👇️ used to changes options of the mui-datatable based on the calling component
  let opts = {};

  // 👇️ handles click from available dataset\add new dataset icon
  const handleClickIcon = (icon) => {
    window.location.assign("./" + icon); // one level up
  };

  // 👇️ handles click from
  const handleClickRow = (rowData) => {
    window.location.assign(
      window.location + "/" + rowData[0] + "?area=" + rowData[1]
    );
  };

  switch (cntx) {
    case "available":
      // 👇️ temp icons in toolbar to navigate to "Add new..."
      opts = {
        customToolbar: () => {
          return (
            <>
              <Tooltip title={t("available.buttons.dataset.tooltip")}>
                <IconButton
                  onClick={() => {
                    handleClickIcon("add");
                  }}
                >
                  <DataObjectIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("available.buttons.connection.tooltip")}>
                <IconButton
                  onClick={() => {
                    handleClickIcon("connection");
                  }}
                >
                  <HubIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      };
      break;
    case "anonymized":
      opts = { onRowClick: handleClickRow };
      break;
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
      // 👇️ change 'Sensitivity' column to link to dlp Analysis page
      const sensitivityIndex = columns.findIndex(
        (e) => e.name === "sensitivity"
      );
      columns[sensitivityIndex] = {
        ...columns[sensitivityIndex],
        options: {
          customBodyRender: (_value, tableMeta) => {
            const jobId = tableMeta.rowData[0];
            return (
              <AlliumProvider>
                <Link href={`./imported/${jobId}`}>
                  {t("imported.links.report.title")}
                </Link>
              </AlliumProvider>
            );
          },
        },
      };
      opts = { onRowClick: handleClickRow };
      break;
    case "connection":
      // 👇️ add edit button to first column for each row
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
    textLabels,
    search: true,
    download: true,
    viewColumns: true,
    print: false,
    filter: true,
    filterType: "dropdown",
    tableBodyHeight: "400px",
    selectableRows: "none",
  };

  // 👉️ RETURN: MUI datatable
  return (
    <>
      <MUIDataTable data={rows} columns={columns} options={options} />
    </>
  );
}
