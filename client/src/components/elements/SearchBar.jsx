import axios from "axios";
import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/SearchBar.module.css";
import Logo from "../elements/Logo";
import SearchInput from "../elements/SearchInput";
import DropDownList from "../elements/DropDownList";
import GameCards from "../elements/GameCards";
import { filterByGenre, filterBySource, sortByRating } from "../../redux/actions";

const BASE_URL = "http://localhost:3001";

function SearchBar({ open, onClose, onSearch, onGameSelect }) {
  const [value, setValue] = useState("");
  const games = useSelector(state => state ? state.videogames : []);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const dispatch = useDispatch();

  const genres = [
    "All",
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Shooter",
    "Casual",
    "Simulation",
    "Puzzle",
    "Arcade",
    "Platformer",
    "Racing",
    "Sports",
    "Massively Multiplayer",
    "Family",
    "Fighting",
    "Board Games",
    "Educational",
    "Card",
  ];

  useEffect(() => {
    dispatch(filterBySource(selectedSource));
  }, [selectedSource]);

  useEffect(() => {
    dispatch(filterByGenre(selectedGenre));
  }, [selectedGenre]);

  useEffect(() => {
    dispatch(sortByRating(selectedRating));
  }, [selectedRating]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Fetch games from the API based on the search query
      const apiGamesResponse = await axios.get(
        `${BASE_URL}/videogames?name=${value}`
      );
      dispatch({ type: 'GET_VIDEOGAMES', payload: apiGamesResponse.data });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleAllGames = async () => {
    try {
      // Fetch all games from the API
      const apiGamesResponse = await axios.get(`${BASE_URL}/videogames`);
      dispatch({ type: 'GET_VIDEOGAMES', payload: apiGamesResponse.data });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  
  return (
    <div className={styles.searchBar}>
      {open && (
        <section className={styles.content}>
          <Logo />
          <SearchInput value={value} onChange={onChange} />
          <div className={styles.buttons}>
            <button onClick={handleSearch} id="enter">
              Games Search
            </button>
            <button onClick={handleAllGames}>All Games</button>
          </div>

          <div className={styles.dropdowns}>
          <DropDownList
  dropdownName="Genre"
  options={genres}
  selectedOption={selectedGenre}
  setSelectedOption={setSelectedGenre}
/>
<DropDownList
  dropdownName="Rating"
  options={["Ascending", "Descending"]}
  selectedOption={selectedRating}
  setSelectedOption={setSelectedRating}
/>
<DropDownList
  dropdownName="Source"
  options={["DB", "API"]}
  selectedOption={selectedSource}
  setSelectedOption={setSelectedSource}
/>

          </div>

          <GameCards games={games} onGameSelect={onGameSelect} />
        </section>
      )}
    </div>
  );
}

export default SearchBar;
