import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography } from "@material-ui/core";

import { formatCaseCard } from "../../utilFunctions";
import { setcaseType } from "../redux/CountrySlice";

export default function CardCase({ title, topic, color }) {
  const dispatch = useDispatch();
  const caseType = useSelector(state => state.country.caseType);
  const countryInfo = useSelector(state => state.country.countryInfo);
  const loading = useSelector(state => state.country.loading);

  return (
    <Card
      onClick={() => dispatch(setcaseType(topic))}
      style={{
        border: `1px solid ${color}`,
        cursor: "pointer",
        borderTop:
          caseType === topic ? `10px solid ${color}` : `1px solid ${color}`,
      }}
    >
      <CardContent style={{ padding: "10px 30px 24px 30px" }}>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>

            <h2 style={{ color: `${color}` }}>
              {formatCaseCard(
                (topic === "cases" && countryInfo.todayCases) ||
                  (topic === "deaths" && countryInfo.todayDeaths) ||
                  (topic === "recovered" && countryInfo.todayRecovered),
                "new"
              )}
            </h2>
            <Typography color="textSecondary">
              total:&nbsp;
              {formatCaseCard(
                (topic === "cases" && countryInfo.cases) ||
                  (topic === "deaths" && countryInfo.deaths) ||
                  (topic === "recovered" && countryInfo.recovered)
              )}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
