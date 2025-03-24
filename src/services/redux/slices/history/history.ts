import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  watchedMovies: ISearchElem[];
}

const initialState: IInitialState = {
  watchedMovies: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const { id } = action.payload;
      const isMovieExists = state.watchedMovies.some((movie: ISearchElem) => movie.id === id);
      if (!isMovieExists) {
        state.watchedMovies = [action.payload, ...state.watchedMovies];
      }
    },
    removeMovie: (state, action) => {
      const movieIdToRemove = action.payload;
      state.watchedMovies = state.watchedMovies.filter(
        (movie: ISearchElem) => movie.id !== movieIdToRemove,
      );
    },
  },
});

export const filmsList = (state: { history: IInitialState }) => state.history.watchedMovies;

export const { addMovie, removeMovie } = historySlice.actions;
export default historySlice.reducer;