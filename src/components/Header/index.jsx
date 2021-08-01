import { useState, useEffect, useContext } from "react";

import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./style.css";
import { CountryInfoContext } from "../context/CountryInfoContext";
import { sortData } from "../../utilFunctions";

export default function Header({ setMapCenter, setMapZoom, setMapCountries }) {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [
    countryInfo,
    setcountryInfo,
    loading,
    setLoading,
    allCountries,
    setallCountries,
  ] = useContext(CountryInfoContext);

  //getting the initial info for all countries
  useEffect(() => {
    setLoading(true);

    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setcountryInfo(data);
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  }, []);

  //getting all the covid 19 effected countries
  useEffect(() => {
    setLoading(true);

    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {
        let countryData = data.map(item => ({
          name: item.country,
          value: item.countryInfo.iso2,
        }));
        const sortedData = sortData(data);

        setLoading(false);
        //for show all the affected countries in the select option
        setcountries(countryData);
        //for the sorted table
        setallCountries(sortedData);
        //for the map data
        setMapCountries(data);
      })
      .catch(err => alert(err));
  }, []);

  const handleChange = e => {
    let countryCode = e.target.value;

    //change the input value
    setcountry(countryCode);
    //show the loading indicator
    setLoading(true);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    //fetchting the individual country info
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setcountryInfo(data);

        //change the map when change the country
        if (countryCode !== "worldwide") {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(7);
        } else {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(3);
        }
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <div className="header">
      <h1>COVID TRACKER</h1>

      <FormControl variant="outlined">
        <Select
          className="header__select"
          native
          value={country}
          onChange={handleChange}
        >
          <option value="worldwide">Worldwide</option>

          {countries.map((item, i) => (
            <option key={i} value={item.value}>
              {item.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
