// rootReducer.js

import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_GENRES,
  GET_VIDEOGAME,
  POST_CREATE_VIDEOGAME,
  FILTER_BY_SOURCE,
  FILTER_BY_GENRE,
  SORT_BY_NAME,
  SORT_BY_RATING,
} from "./actions";

const initialState = {
  videogames: [],
  allVideogames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_VIDEOGAME:
      return {
        ...state,
        videogame: action.payload,
      };
    case POST_CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case FILTER_BY_SOURCE:
      const allVideogames = state.allVideogames;
      const sourceFiltered =
        action.payload === "created"
          ? allVideogames.filter((el) => el.id.length === 36)
          : allVideogames.filter((el) => el.id.length !== 36);
      return {
        ...state,
        videogames:
          action.payload === "all" ? state.allVideogames : sourceFiltered,
      };
    case SORT_BY_NAME:
      const sortedVideogames = [...state.videogames];
      sortedVideogames.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (action.payload === "asc") {
          return nameA.localeCompare(nameB);
        } else if (action.payload === "desc") {
          return nameB.localeCompare(nameA);
        }
        return 0;
      });
      return {
        ...state,
        videogames: sortedVideogames,
      };

    case FILTER_BY_GENRE:
      const allVideogamesGenre = state.allVideogames;
      const filteredByGenre = allVideogamesGenre.filter((el) =>
        el.genres.includes(action.payload)
      );
      return {
        ...state,
        videogames:
          action.payload === "all" ? [...state.allVideogames] : filteredByGenre,
      };

    case SORT_BY_RATING:
      const allVideogamesRating = [...state.allVideogames];
      const sortedByRating =
        action.payload === "Ascending"
          ? allVideogamesRating.sort((a, b) => a.rating - b.rating)
          : allVideogamesRating.sort((a, b) => b.rating - a.rating);
      return {
        ...state,
        videogames: sortedByRating,
      };
    default:
      return state;
  }
};

export default rootReducer;
