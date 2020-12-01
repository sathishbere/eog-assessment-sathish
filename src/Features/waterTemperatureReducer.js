import { createSlice } from 'redux-starter-kit';

const initialState = {
  waterTempData: [],
};

const selected = createSlice({
  name: 'waterTempData',
  initialState,
  reducers: {
    waterTempData: (state, action) => {
      state.waterTempData = [...state.waterTempData, action.payload];
    },
  },
});

export const waterTempReducer = selected.reducer;
export const waterTempActions = selected.actions;
