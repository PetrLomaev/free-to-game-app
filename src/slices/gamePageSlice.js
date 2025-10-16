import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentGame: null,
  loading: true,
};

const gamePageSlice = createSlice({
  name: 'gamePage',
  initialState,
  reducers: {
    setGame(state, action) {
      state.currentGame = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setGame,
  setLoading,
} = gamePageSlice.actions;

export default gamePageSlice.reducer;
