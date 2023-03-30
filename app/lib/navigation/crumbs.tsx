// 👇️ page based crumbs

const home = { title: "crumbs.home.tag", href: "/" };
const analytic = { title: "crumbs.analytic.tag", href: "#" };
const anonymized = {
  title: "crumbs.anonymized.datasets.tag",
  href: "../anonymized",
};
const anonymizedArea = { title: "crumbs.anonymized.dataset.tag", href: "#" };
const datasetAdd = { title: "crumbs.dataset.add.tag", href: "#" };
const datasetAvailable = {
  title: "crumbs.dataset.available.tag",
  href: "available",
};
const datasetConnection = { title: "crumbs.dataset.connection.tag", href: "#" };
const imported = { title: "crumbs.imported.datasets.tag", href: "../imported" };
const importedArea = { title: "crumbs.imported.dataset.tag", href: "#" };
const insight = { title: "crumbs.insight.tag", href: "#" };

export const crumbsAnalytic = [home, analytic];
export const crumbsAnonymized = [home, anonymized];
export const crumbsAnonymizedArea = [home, anonymized, anonymizedArea];
export const crumbsDatasetAdd = [home, datasetAvailable, datasetAdd];
export const crumbsDatasetAvailable = [home, datasetAvailable];
export const crumbsDatasetConnection = [
  home,
  datasetAvailable,
  datasetConnection,
];
export const crumbsHome = [home];
export const crumbsImported = [home, imported];
export const crumbsImportedArea = [home, imported, importedArea];
export const crumbsInsight = [home, insight];
