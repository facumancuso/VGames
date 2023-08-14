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
    SORT_BY_RATING
  } from './actions';
  
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
          videogame: action.payload
        };
      case POST_CREATE_VIDEOGAME:
        return {
          ...state,
        };
      case FILTER_BY_SOURCE:
        const allVideogames = state.allVideogames.map((game) => {
          const source = game.source === "DB" ? "database" : "API";
          game.source = source;
          return game;
        });
        const filteredBySource =
          action.payload === "DB"
            ? allVideogames.filter((game) => game.source === "database")
            : allVideogames.filter((game) => game.source === "API");
        return {
          ...state,
          videogames: action.payload === "All" ? state.allVideogames : filteredBySource,
        };
      case FILTER_BY_GENRE:
        const allVideogamesGenre = state.allVideogames;
        const filteredByGenre =
          action.payload === "All"
            ? [...state.allVideogames]
            : allVideogamesGenre.filter((game) => game.genre === action.payload);
        return {
          ...state,
          videogames: filteredByGenre,
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
  