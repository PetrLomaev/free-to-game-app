import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  originalGames: [],
  filteredGamesWithoutSorting: [],
  currentPage: 1,
  itemsPerPage: 20,
  totalGames: 0,
  activeFilters: {
    platforms: [],
    genres: [],
  },
  activeSortOption: 'not_sorted',
  availablePlatforms: [],
  availableGenres: [],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames(state, action) {
      state.games = action.payload;
      state.originalGames = action.payload;
      state.filteredGamesWithoutSorting = action.payload;

      state.availablePlatforms = [...new Set(action.payload.map((game) => game.platform.trim()))].sort();
      state.availableGenres = [...new Set(action.payload.map((game) => game.genre.trim()))].sort();
      state.totalGames = action.payload.length;
      state.error = null;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setActiveSortOption(state, action) {
      state.activeSortOption = action.payload;
      if (state.originalGames.length === 0) return;

      if (action.payload === 'not_sorted') {
        state.games = [...state.filteredGamesWithoutSorting];
      } else {
        const gamesCopy = [...state.filteredGamesWithoutSorting];
        if (action.payload === 'date_old_first') {
          gamesCopy.sort((a, b) => {
            return new Date(a.release_date) - new Date(b.release_date);
          });
        } else if (action.payload === 'date_new_first') {
          gamesCopy.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
          });
        }
        state.games = gamesCopy;
      };
      state.totalGames = state.games.length;
      state.currentPage = 1;
    },
    togglePlatformFilter(state, action) {
      const platform = action.payload;
      const index = state.activeFilters.platforms.indexOf(platform);
      if (index === -1) {
        state.activeFilters.platforms.push(platform);
      } else {
        state.activeFilters.platforms.splice(index, 1);
      }
      applyFilters(state);
    },
    toggleGenreFilter(state, action) {
      const genre = action.payload;
      const index = state.activeFilters.genres.indexOf(genre);
      if (index === -1) {
        state.activeFilters.genres.push(genre);
      } else {
        state.activeFilters.genres.splice(index, 1);
      }
      applyFilters(state);
    },
    resetFilters(state) {
      state.activeFilters = {
        platforms: [],
        genres: [],
      };
      state.games = [...state.originalGames];
      state.filteredGamesWithoutSorting = [...state.originalGames];
      state.totalGames = state.originalGames.length;
      state.currentPage = 1;
      state.activeSortOption = 'not_sorted';
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

const applyFilters = (state) => {
  let filteredGames = [...state.originalGames];
  if (state.activeFilters.platforms.length > 0) {
    filteredGames = filteredGames.filter((game) =>
      state.activeFilters.platforms.includes(game.platform));
  }
  if (state.activeFilters.genres.length > 0) {
    filteredGames = filteredGames.filter((game) =>
      state.activeFilters.genres.includes(game.genre));
  }
  state.games = filteredGames;
  state.filteredGamesWithoutSorting = filteredGames;
  state.totalGames = filteredGames.length;
  state.currentPage = 1;
  state.activeSortOption = 'not_sorted';
};

export const {
  setGames,
  setCurrentPage,
  setActiveSortOption,
  togglePlatformFilter,
  toggleGenreFilter,
  resetFilters,
  setLoading,
  setError,
  clearError,
} = gamesSlice.actions;

export default gamesSlice.reducer;
