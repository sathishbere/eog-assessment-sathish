import { createSlice } from 'redux-starter-kit';

const initialState = {
  selectedMetrics: [],
};

const selectedActivemetrics = createSlice({
  name: 'selectedActiveMetrics',
  initialState,
  reducers: {
    active: (state, action) => {
      state.selectedMetrics = [...state.selectedMetrics, action.payload];
    },
    remove: (state, action) => {
      state.selectedMetrics = state.selectedMetrics.filter(element => element.metricName !== action.payload);
    },
  },
});

export const selectedActiveMetrics = selectedActivemetrics.reducer;
export const selectedMetricActions = selectedActivemetrics.actions;
