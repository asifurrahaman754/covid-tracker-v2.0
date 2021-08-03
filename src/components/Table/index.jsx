import React from "react";

import numeral from "numeral";
import { useSelector } from "react-redux";
import "./style.css";

function Table() {
  console.log("Table component");
  const { loading, allCountries } = useSelector(state => state.country);

  return (
    <>
      <h3 className="table_title">Live cases by country</h3>
      <table className="table">
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            allCountries.map(({ country, cases }, i) => (
              <tr key={i}>
                <td>{country}</td>
                <td>
                  <strong>{numeral(cases).format("0,0")}</strong>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default React.memo(Table);
