import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { oilTempActions } from './oilTemperatureReducer';
import { injvActions } from './injectedValveReducer';
import { flareTempActions } from './flareTReducer';
import { casingPressureActions } from './CasingPreducer';
import { tubingPressureActions } from './tubingPReducer';
import { waterTempActions } from './waterTemperatureReducer';


const subClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
  timeout: 20000,
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subClient.request(operation),
    }),
  ],
});

const newMeasurement = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {
  return (
    <Provider value={client}>
      <WeatherData />
    </Provider>
  );
};

const WeatherData = () => {
  const loadSwitch = (measurement) => {
    const { metric } = measurement;
    switch (metric) {
      case 'casingPressure':
        return dispatch(casingPressureActions.casingPressureData(measurement));
      case 'flareTemp':
        return dispatch(flareTempActions.flareTempData(measurement));
      case 'injValveOpen':
        return dispatch(injvActions.injValveData(measurement));
      case 'oilTemp':
        return dispatch(oilTempActions.oilTempData(measurement));
      case 'tubingPressure':
        return dispatch(tubingPressureActions.tubingPressureData(measurement));
      case 'waterTemp':
        return dispatch(waterTempActions.waterTempData(measurement));
    }

  };

  const dispatch = useDispatch();
  const myMeasurement = useCallback(val => loadSwitch(val), [loadSwitch]);
  const [subResponse] = useSubscription({ query: newMeasurement });
  const { data: weatherData } = subResponse;

  useEffect(() => {
    if (!weatherData) return;
    myMeasurement(weatherData.newMeasurement);
  }, [weatherData, myMeasurement]);

  return null;
};
