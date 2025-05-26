import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducers from "./connectionSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
