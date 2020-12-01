import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import Card from './Card';

export const GraphCharts = () => {


  const casingPressureData = useSelector(state => state.casingPressure.casingPressureData);
  const [listData, setListData] = useState([]);
  const flareTempData = useSelector(state => state.flareTemp.flareTempData);
  const injValveData = useSelector(state => state.injValve.injValveData);
  const multipleData = useSelector(state => state.multipleData.multipleData);
  const selectedMetrics = useSelector(state => state.selectedActiveMetrics.selectedMetrics);
  const oilTempData = useSelector(state => state.oilTemp.oilTempData);
  const tubingPressureData = useSelector(state => state.tubingPressure.tubingPressureData);
  const waterTempData = useSelector(state => state.waterTemp.waterTempData);

  const selectActive = data => {
    for (let i = 0; i < selectedMetrics.length; i++) {
      if (data.metric === selectedMetrics[i].metricName) {
        return true;
      }
    }
  };

  const contentData = listData.filter(selectActive);

  useEffect(() => {
    if (multipleData.length > 0) {
      return setListData([
        {
          metric: 'injValveOpen',
          measurements: multipleData[0].measurements.concat(injValveData),
        },
        {
          metric: 'oilTemp',
          measurements: multipleData[1].measurements.concat(oilTempData),
        },
        {
          metric: 'casingPressure',
          measurements: multipleData[2].measurements.concat(casingPressureData),
        },
        {
          metric: 'tubingPressure',
          measurements: multipleData[3].measurements.concat(tubingPressureData),
        },
        {
          metric: 'flareTemp',
          measurements: multipleData[4].measurements.concat(flareTempData),
        },
        {
          metric: 'waterTemp',
          measurements: multipleData[5].measurements.concat(waterTempData),
        },
      ]);
    }
  }, [injValveData, casingPressureData, flareTempData, multipleData, oilTempData, tubingPressureData, waterTempData]);

  const chartListNames = {
    injValveOpen: 'INJ Valve Open',
    oilTemp: 'Oil Temp',
    tubingPressure: 'Tubing Pressure',
    flareTemp: 'Flare Temp',
    casingPressure: 'Casing Pressure',
    waterTemp: 'Water Temp',
    default: 'metric',
  };

  const chartListColors = {
    injValveOpen: '#1BD82A',
    oilTemp: '#000000',
    tubingPressure: '#FF0000',
    flareTemp: '#FFB201',
    casingPressure: '#830BEE',
    waterTemp: '#000CFF',
    default: '#00FFE0',
  };

  return (
    <>
      {selectedMetrics.map(i => {
        if (i.metricName === injValveData[0].metric) {
          return (
            <Card
              color={chartListColors[i.metricName]}
              metric={chartListNames[i.metricName]}
              data={`${injValveData[injValveData.length - 1].value}${injValveData[0].unit}`}
            />
          );
        } else if (i.metricName === oilTempData[0].metric) {
          return (
            <Card
              color={chartListColors[i.metricName]}
              metric={chartListNames[i.metricName]}
              data={`${oilTempData[oilTempData.length - 1].value} ${oilTempData[0].unit}`}
            />
          );
        } else if (i.metricName === flareTempData[0].metric) {
          return (
            <Card
              color={chartListColors[i.metricName]}
              metric={chartListNames[i.metricName]}
              data={`${flareTempData[flareTempData.length - 1].value} ${flareTempData[0].unit}`}
            />
          );
        } else if (i.metricName === waterTempData[0].metric) {
          return (
            <Card
              color={chartListColors[i.metricName]}
              metric={chartListNames[i.metricName]}
              data={`${waterTempData[waterTempData.length - 1].value} ${waterTempData[0].unit}`}
            />
          );
        } else if (i.metricName === casingPressureData[0].metric) {
          return (
            <Card
              color={chartListColors[i.metricName]}
              metric={chartListNames[i.metricName]}
              data={`${casingPressureData[casingPressureData.length - 1].value} ${casingPressureData[0].unit}`}
            />
          );
        } else if (i.metricName === tubingPressureData[0].metric) {
          return (
            <Card
              color={chartListColors[i.metricName]}
              metric={chartListNames[i.metricName]}
              data={`${tubingPressureData[tubingPressureData.length - 1].value} ${tubingPressureData[0].unit}`}
            />
          );
        }
      })}
      <LineChart width={1000} height={600}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        {contentData.map(i => {
          return (
            <Line
              dataKey="value"
              data={i.measurements}
              name={chartListNames[i.metric]}
              key={i.metric}
              dot={false}
              stroke={chartListColors[i.metric]}
            />
          );
        })}
      </LineChart>
    </>
  );
}

export default GraphCharts;