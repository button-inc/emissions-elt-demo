// 👇️ page based crumbs

const home = { title: "crumbs.home.tag", href: "/" };
const analytic = { title: "crumbs.analytic.tag", href: "#" };
const anonymized = {
  title: "crumbs.anonymized.datasets.tag",
  href: "anonymize",
};
const anonymizedArea = { title: "crumbs.anonymized.datasets.tag", href: "#" };
const datasetAdd = { title: "crumbs.dataset.add.tag", href: "#" };
const datasetAvailable = { title: "crumbs.dataset.available.tag", href: "#" };
const datasetConnection = { title: "crumbs.dataset.connection.tag", href: "#" };
const imported = { title: "crumbs.imported.datasets.tag", href: "imported" };
const importedArea = { title: "crumbs.imported.datasets.tag", href: "#" };
const insight = { title: "crumbs.insight.tag", href: "#" };

export const crumbsAnalytic = [home, analytic];
export const crumbsAnonymized = [home, anonymized];
export const crumbsAnonymizedArea = [home, anonymized, anonymizedArea];
export const crumbsDatasetAvailable = [home, datasetAdd, datasetAvailable];
export const crumbsDatasetConnection = [home, datasetAdd, datasetConnection];
export const crumbsHome = [home];
export const crumbsImported = [home, imported];
export const crumbsImportedArea = [home, imported, importedArea];
export const crumbsInsight = [home, insight];
