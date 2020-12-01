import { createSlice } from 'redux-starter-kit';

const initialState = {
  weatherData: {},
};

const weather = createSlice({
  name: 'weathernData',
  initialState,
  reducers: {
    weatherData: (state, action) => {
      state.weatherData = action.payload;
    },
  },
});

export const weatherReducer = weather.reducer;
export const weatherActions = weather.actions;
