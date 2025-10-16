import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import gamePageReducer from './gamePageSlice';

export default configureStore({
  reducer: {
    games: gamesReducer,
    gamePage: gamePageReducer,
    // reducers here
  },
});