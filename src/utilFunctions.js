export const sortData = data => {
  let sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
