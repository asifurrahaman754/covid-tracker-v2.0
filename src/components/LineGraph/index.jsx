import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./style.css";

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
  scales: {
    // xAxis: {
    //   type: "time",
    //   time: {
    //     format: "MM/DD/YY",
    //     tooltipFormat: "ll",
    //   },
    // },
    yAxis: {
      gridLines: {
        display: false,
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, values) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};

export default function LineGraph({ type = "cases" }) {
  const [data, setdata] = useState([]);

  //take the actual api data an modify it according to the expected graph data
  const buildChartData = (data, type) => {
    const chartData = [];
    const workingObj = data[type];
    let lastDataPoint;

    for (let key in workingObj) {
      //we create a new object if the lasDataPoint has a value;
      if (lastDataPoint) {
        const newDataPoint = {
          x: key,
          y: workingObj[key] - lastDataPoint,
        };

        chartData.push(newDataPoint);
      }
      lastDataPoint = workingObj[key];
    }

    return chartData;
  };

  //get the graph data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then(res => res.json())
      .then(data => {
        const ChartData = buildChartData(data, type);
        setdata(ChartData);
      })
      .catch(err => alert(err));
  }, [type]);

  return (
    <div className="graph_wrap">
      {data.length && (
        <Line
          className="graph"
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
                fill: true,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}
