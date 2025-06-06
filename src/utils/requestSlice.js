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
    removeRequest: (state, action) => {
      state.requests = state.requests.filter((request) => request._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
