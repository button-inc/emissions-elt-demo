// 👇️ DataTable column definition- reflecting data response

export const columnsAnonymized = [
  { name: "jobId", options: { display: false } },
  { label: "anonymized.datasets.columns.0", name: "fileName" },
  { label: "anonymized.datasets.columns.1", name: "nickname" },
  { label: "anonymized.datasets.columns.2", name: "submissionDate" },
  { label: "anonymized.datasets.columns.3", name: "email" },
];
export const columnsAnonymizedArea = [
  { label: "anonymized.dataset.columns.0", name: "fileName" },
  { label: "anonymized.dataset.columns.1", name: "nickname" },
  { label: "anonymized.dataset.columns.2", name: "submissionDate" },
  { label: "anonymized.dataset.columns.3", name: "email" },
];

export const columnsDatasetAvailable = [
  { name: "jobId", options: { display: false } },
  { label: "imported.datasets.columns.0", name: "fileName" },
  { label: "imported.datasets.columns.1", name: "nickname" },
  { label: "imported.datasets.columns.2", name: "submissionDate" },
  { label: "imported.datasets.columns.3", name: "email" },
];
export const columnsDatasetConnection = [
  { label: "imported.dataset.columns.0", name: "fileName" },
  { label: "imported.dataset.columns.1", name: "nickname" },
  { label: "imported.dataset.columns.2", name: "submissionDate" },
  { label: "imported.dataset.columns.3", name: "email" },
];

export const columnsImported = [
  { name: "jobId", options: { display: false } },
  { label: "imported.datasets.columns.0", name: "fileName" },
  { label: "imported.datasets.columns.1", name: "nickname" },
  { label: "imported.datasets.columns.2", name: "submissionDate" },
  { label: "imported.datasets.columns.3", name: "email" },
  { label: "imported.datasets.columns.4", name: "sensitivity" },
];
export const columnsImportedArea = [
  { label: "imported.analysis.columns.0", name: "columnTitle" },
  { label: "imported.analysis.columns.1", name: "identifiedInfoType" },
  { label: "imported.analysis.columns.2", name: "maxLikelihood" },
  { label: "imported.analysis.columns.3", name: "quotes" },
  { label: "imported.analysis.columns.4", name: "toAnonymize" },
];
