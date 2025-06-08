import { createSlice } from "@reduxjs/toolkit";
import { convertToOldStructure } from "../../../utils/filmAdapter";

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
      const movieData = convertToOldStructure(action.payload);
      const { id } = movieData;
      
      const isMovieExists = state.watchedMovies.some(
        (movie: ISearchElem) => String(movie.id) === String(id),
      );
      
      if (!isMovieExists) {
        state.watchedMovies = [movieData, ...state.watchedMovies];
      }
    },
    removeMovie: (state, action) => {
      const movieIdToRemove = action.payload.id;
      state.watchedMovies = state.watchedMovies.filter(
        (movie: ISearchElem) => String(movie.id) !== String(movieIdToRemove),
      );
    },
  },
});

export const filmsList = (state: { history: IInitialState }) => state.history.watchedMovies;

export const { addMovie, removeMovie } = historySlice.actions;
export default historySlice.reducer;