import { Card, CardContent } from "@material-ui/core";

import CardCase from "./components/CardCase";
import Header from "./components/Header";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="App">
      <div className="app__left_content">
        <Header />
        <div className="app__stats">
          <CardCase title="New Case" topic="cases" color="#FFA900" />
          <CardCase title="New Death" topic="deaths" color="#dd0b0b" />
          <CardCase title="New Recovery" topic="recovered" color="#03ac35" />
        </div>
        <Map />
      </div>
      <Card className="app__right_content">
        <CardContent>
          <Table />
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
