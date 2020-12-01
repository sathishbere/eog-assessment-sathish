import { createSlice } from 'redux-starter-kit';

const initialState = {
  flareTempData: [],
};

const selected = createSlice({
  name: 'flareTempData',
  initialState,
  reducers: {
    flareTempData: (state, action) => {
      state.flareTempData = [...state.flareTempData, action.payload];
    },
  },
});

export const flareTempReducer = selected.reducer;
export const flareTempActions = selected.actions;
