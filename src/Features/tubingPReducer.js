import { createSlice } from 'redux-starter-kit';

const initialState = {
  tubingPressureData: [],
};

const selected = createSlice({
  name: 'tubingPressureData',
  initialState,
  reducers: {
    tubingPressureData: (state, action) => {
      state.tubingPressureData = [...state.tubingPressureData, action.payload];
    },
  },
});

export const tubingPReducer = selected.reducer;
export const tubingPressureActions = selected.actions;
