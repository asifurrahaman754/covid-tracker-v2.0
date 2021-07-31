import { useContext } from "react";

import { CountryInfoContext } from "../context/CountryInfoContext";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function CardCase({ title, topic, color }) {
  const [countryInfo, setcountryInfo, loading, setLoading] =
    useContext(CountryInfoContext);

  return (
    <Card style={{ border: `1px solid ${color}` }}>
      <CardContent style={{ padding: "10px 30px 24px 30px" }}>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <h2 style={{ color: `${color}` }}>
              {(topic === "new" && countryInfo.todayCases) ||
                (topic === "death" && countryInfo.todayDeaths) ||
                (topic === "recover" && countryInfo.todayRecovered)}
            </h2>
            <Typography color="textSecondary">
              {(topic === "new" && countryInfo.cases) ||
                (topic === "death" && countryInfo.deaths) ||
                (topic === "recover" && countryInfo.recovered)}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
