import { Chart } from 'react-google-charts';

function Map() {

  const data = [
    ["Latitude", "Longitude"],
    [51.387420, 7.003440],
  ];

  var options = {
    region: 'DE',
    colorAxis: {
      minValue: 'c7c0e4',
      maxValue: 'c7c0e4',
    },
    dataMode: 'markers',
    datalessRegionColor: 'ffffff',
    legend: 'none',
    magnifyingGlass: false,
  };

  return (
    <>
      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
      />
    </>
  );
}

export default Map;
