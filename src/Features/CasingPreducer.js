import { createSlice } from 'redux-starter-kit';

const initialState = {
  casingPressureData: [],
};

const selectedcasingPressureData = createSlice({
  name: 'casingPressureData',
  initialState,
  reducers: {
    casingPressureData: (state, action) => {
      state.casingPressureData = [...state.casingPressureData, action.payload];
    },
  },
});

export const CasingPReducer = selectedcasingPressureData.reducer;
export const casingPressureActions = selectedcasingPressureData.actions;
