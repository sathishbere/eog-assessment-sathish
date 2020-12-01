import { createSlice } from 'redux-starter-kit';

const initialState = {
  injValveData: []
};

const selected = createSlice({
  name: 'injValveData',
  initialState,
  reducers: {
    injValveData: (state, action) => {
      state.injValveData = [...state.injValveData, action.payload]
    },
  },
});

export const injValveReducer = selected.reducer;
export const injvActions = selected.actions;
