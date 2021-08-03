import {
  MapContainer as LeafletMap,
  TileLayer,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import { useSelector } from "react-redux";

import "./style.css";
import numeral from "numeral";

//colors for different cases in the map
const casesTypeColors = {
  cases: {
    hex: "#f08a17",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export default function Map() {
  // i could distructure these values but i didn't do it because it creates rerendering problem
  const caseType = useSelector(state => state.country.caseType);
  const mapCountries = useSelector(state => state.country.mapCountries);
  const mapCenter = useSelector(state => state.country.mapCenter);
  const mapZoom = useSelector(state => state.country.mapZoom);

  return (
    <div className="map">
      <LeafletMap center={mapCenter} zoom={mapZoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapCountries.map((country, i) => (
          <Circle
            key={i}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{
              color: casesTypeColors[caseType].hex,
              fillColor: casesTypeColors[caseType].hex,
            }}
            fillOpacity={0.4}
            radius={
              Math.sqrt(country[caseType]) *
              casesTypeColors[caseType].multiplier
            }
          >
            <Popup>
              <div className="info-container">
                <div
                  className="info-flag"
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                ></div>
                <h4 className="info-name">{country.country}</h4>
                <div className="info-confirmed">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="info-recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="info-deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}

        <ChangeMapView coords={mapCenter} />
      </LeafletMap>
    </div>
  );
}

// change the map according to the coordinates
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}
