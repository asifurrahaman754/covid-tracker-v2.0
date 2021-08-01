import {
  MapContainer as LeafletMap,
  TileLayer,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "./style.css";

//colors for different cases in the map
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
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

export default function Map({ countries, casesType = "deaths", coords, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={coords} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries.map((country, i) => (
          <Circle
            key={i}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
              Math.sqrt(country[casesType]) *
              casesTypeColors[casesType].multiplier
            }
          >
            <Popup>
              <h1>this is awesome</h1>
            </Popup>
          </Circle>
        ))}

        <ChangeMapView coords={coords} />
      </LeafletMap>
    </div>
  );
}

//to change the map according to the coordinates
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}
