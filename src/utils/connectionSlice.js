import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
  name: 'connections',
  initialState: {
    connections: [],
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state, action) => {
      state.connections = state.connections.filter((connect) => connect._id !== action.payload);
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
