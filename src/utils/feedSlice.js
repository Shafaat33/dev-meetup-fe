import { createSlice } from '@reduxjs/toolkit'

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    feed: [],
  },
  reducers: {
    addFeed: (state, action) => {
      state.feed = action.payload;
    },
    removeUserFromFeed: (state, action) => {
      state.feed = state.feed.filter((f) => f._id !== action.payload);
    },
  }
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
