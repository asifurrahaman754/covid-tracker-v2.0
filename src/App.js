import { Card, CardContent } from "@material-ui/core";
import CardCase from "./components/CardCase";
import CountryInfoContextProvider from "./components/context/CountryInfoContext";
import Header from "./components/Header";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

function App() {
  return (
    <div className="App">
      <CountryInfoContextProvider>
        <div className="app__left_content">
          <Header />

          <div className="app__stats">
            <CardCase title="New Case" topic="new" color="#FFA900" />
            <CardCase title="Death" topic="death" color="#dd0b0b" />
            <CardCase title="Recovery" topic="recover" color="#03ac35" />
          </div>

          <Map />
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
