import { useState, useEffect } from "react";

import { FormControl, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";

import "./style.css";
import { sortData } from "../../utilFunctions";
import {
  setcountryInfo,
  setallCountries,
  setLoading,
  setMapCenter,
  setMapZoom,
  setMapCountries,
} from "../redux/CountrySlice";

export default function Header() {
  console.log("Header component");
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const dispatch = useDispatch();

  //getting the initial info for all countries
  useEffect(() => {
    dispatch(setLoading(true));

    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        dispatch(setLoading(false));
        dispatch(setcountryInfo(data));
      })
      .catch(err => {
        dispatch(setLoading(false));
        alert(err);
      });
  }, []);

  //getting all the covid 19 effected countries
  useEffect(() => {
    dispatch(setLoading(true));

    fetch("https://disease.sh/v3/covid-19/countries")
      .then(res => res.json())
      .then(data => {
        let countryData = data.map(item => ({
          name: item.country,
          value: item.countryInfo.iso2,
        }));
        const sortedData = sortData(data);

        dispatch(setLoading(false));
        //for show all the affected countries in the select option
        setcountries(countryData);
        //for the sorted table
        dispatch(setallCountries(sortedData));
        //for the map data
        dispatch(setMapCountries(data));
      })
      .catch(err => alert(err));
  }, []);

  const handleChange = e => {
    let countryCode = e.target.value;

    //change the input value
    setcountry(countryCode);
    //show the loading indicator
    dispatch(setLoading(true));

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    //fetchting the individual country info
    fetch(url)
      .then(res => res.json())
      .then(data => {
        dispatch(setLoading(false));
        dispatch(setcountryInfo(data));

        //change the map when change the country
        if (countryCode !== "worldwide") {
          dispatch(setMapCenter([data.countryInfo.lat, data.countryInfo.long]));
          dispatch(setMapZoom(7));
        } else {
          setMapCenter([34.80746, -40.4796]);
          dispatch(setMapZoom(3));
        }
      })
      .catch(err => {
        dispatch(setLoading(false));
        alert(err);
      });
  };

  return (
    <div className="header">
      <img src="/logo.png" alt="covid-19 logo" className="logo" />

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
