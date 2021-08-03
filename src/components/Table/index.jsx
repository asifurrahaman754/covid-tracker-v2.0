import React from "react";

import numeral from "numeral";
import { useSelector } from "react-redux";
import "./style.css";

function Table() {
  const allCountries = useSelector(state => state.country.allCountries);

  return (
    <>
      <h3 className="table_title">Live cases by country</h3>
      <table className="table">
        <tbody>
          {!allCountries.length ? (
            <h3>Loading...</h3>
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
