import numeral from "numeral";
//sort table data in a descending order
export const sortData = data => {
  let sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//show caseCard value in a nice format
export const formatCaseCard = (value, type) =>
  value ? `${(type && "+") || ""}${numeral(value).format("0.0a")}` : "+0";
