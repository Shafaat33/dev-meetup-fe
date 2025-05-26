import { createSlice } from '@reduxjs/toolkit'

export const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
  },
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequests: (state) => {
      state.requests = [];
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
