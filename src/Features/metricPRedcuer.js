import { createSlice } from 'redux-starter-kit';

const initialState = {
  multipleData: [],
};

const selected = createSlice({
  name: 'multiData',
  initialState,
  reducers: {
    multipleData: (state, action) => {
      state.multipleData = action.payload;
    },
  },
});

export const multipleReducer = selected.reducer;
export const metricactions = selected.actions;
