import { createSlice } from 'redux-starter-kit';

const initialState = {
  current: 0,
  past: 0,
};

const selected = createSlice({
  name: 'heartbeat',
  initialState,
  reducers: {
      timestamp: (state, action) => {
        state.current = action.payload;
        state.past = action.payload - 180000;
      }
  },
});

export const heartBeatReducer = selected.reducer;
export const heartBeatactions = selected.actions;
