import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { metricactions } from './metricPRedcuer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const measurementQuery = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
        measurements {
            metric,
            at,
            value,
            unit
        }
    }                                                                                       
  }
  `;

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {

  const timeStamp = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();

  const metricSet = [
    {
      metricName: 'injValveOpen',
      before: timeStamp.current,
      after: timeStamp.past,
    },
    {
      metricName: 'oilTemp',
      before: timeStamp.current,
      after: timeStamp.past,
    },
    {
      metricName: 'casingPressure',
      before: timeStamp.current,
      after: timeStamp.past,
    },
    {
      metricName: 'tubingPressure',
      before: timeStamp.current,
      after: timeStamp.past,
    },
    {
      metricName: 'flareTemp',
      before: timeStamp.current,
      after: timeStamp.past,
    },
    {
      metricName: 'waterTemp',
      before: timeStamp.current,
      after: timeStamp.past,
    },
  ];

  const [measurementRes] = useQuery({
    query: measurementQuery,
    variables: {
      input: metricSet,
    },
  });

  const { fetching, data, error } = measurementRes;

  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) {
      return;
    } else {
      const { getMultipleMeasurements } = data;
      dispatch(metricactions.multipleData(getMultipleMeasurements));
    }
  });

  if (fetching) return <LinearProgress />;

  return null;
};
