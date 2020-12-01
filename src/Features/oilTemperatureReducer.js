import { createSlice } from 'redux-starter-kit';

const initialState = {
  oilTempData: [],
};

const selected = createSlice({
  name: 'oilTempData',
  initialState,
  reducers: {
    oilTempData: (state, action) => {
      state.oilTempData = [...state.oilTempData, action.payload];
    },
  },
});

export const oilTempReducer = selected.reducer;
export const oilTempActions = selected.actions;
