
import { heartBeatReducer } from '../Features/heartBReducer'
import {selectedActiveMetrics } from '../Features/SelectedPressureReducer'
import {  multipleReducer } from '../Features/metricPRedcuer'
import { weatherReducer } from '../Features/weatherPReducer';
import {  waterTempReducer } from '../Features/waterTemperatureReducer';
import {  injValveReducer } from '../Features/injectedValveReducer';
import {  oilTempReducer } from '../Features/oilTemperatureReducer';
import {  flareTempReducer } from '../Features/flareTReducer';
import {  CasingPReducer } from '../Features/CasingPreducer';
import {  tubingPReducer } from '../Features/tubingPReducer';

 
export default {
  multipleData: multipleReducer,
  selectedActiveMetrics: selectedActiveMetrics,
  heartbeat: heartBeatReducer,
  weatherData: weatherReducer,
  injValve: injValveReducer,
  oilTemp: oilTempReducer,
  waterTemp: waterTempReducer,
  flareTemp: flareTempReducer,
  casingPressure: CasingPReducer,
  tubingPressure: tubingPReducer
};