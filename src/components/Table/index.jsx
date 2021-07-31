import { useContext } from "react";

import { CountryInfoContext } from "../context/CountryInfoContext";
import "./style.css";

export default function Table() {
  const [
    countryInfo,
    setcountryInfo,
    loading,
    setLoading,
    allCountries,
    setallCountries,
  ] = useContext(CountryInfoContext);

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
                  <strong>{cases}</strong>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
