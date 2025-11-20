import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentGame: null,
  loading: true,
  error: null,
};

const gamePageSlice = createSlice({
  name: 'gamePage',
  initialState,
  reducers: {
    setGame(state, action) {
      state.currentGame = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError(state, action) {
      state.error = {
        ...action.payload,
        timestamp: Date.now(),
      };
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setGame,
  setLoading,
  setError,
  clearError,
} = gamePageSlice.actions;

export default gamePageSlice.reducer;
