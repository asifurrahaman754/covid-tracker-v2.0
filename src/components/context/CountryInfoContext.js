import { createContext, useState } from "react";

export const CountryInfoContext = createContext();

export default function CountryInfoContextProvider(props) {
  const [countryInfo, setcountryInfo] = useState({});
  const [allCountries, setallCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <CountryInfoContext.Provider
      value={[
        countryInfo,
        setcountryInfo,
        loading,
        setLoading,
        allCountries,
        setallCountries,
      ]}
    >
      {props.children}
    </CountryInfoContext.Provider>
  );
}
