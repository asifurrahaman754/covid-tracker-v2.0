import { useState } from "react";

import { Card, CardContent } from "@material-ui/core";
import CardCase from "./components/CardCase";
import CountryInfoContextProvider from "./components/context/CountryInfoContext";
import Header from "./components/Header";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  return (
    <div className="App">
      <CountryInfoContextProvider>
        <div className="app__left_content">
          <Header
            setMapCenter={setMapCenter}
            setMapZoom={setMapZoom}
            setMapCountries={setMapCountries}
          />

          <div className="app__stats">
            <CardCase title="New Case" topic="new" color="#FFA900" />
            <CardCase title="Death" topic="death" color="#dd0b0b" />
            <CardCase title="Recovery" topic="recover" color="#03ac35" />
          </div>

          <Map coords={mapCenter} zoom={mapZoom} countries={mapCountries} />
        </div>
        <Card className="app__right_content">
          <CardContent>
            <Table />
            <LineGraph />
          </CardContent>
        </Card>
      </CountryInfoContextProvider>
    </div>
  );
}

export default App;
