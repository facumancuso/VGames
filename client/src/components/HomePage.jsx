import React, { useState } from "react";
import styles from "./styles/HomePage.module.css";
import StartMenu from "./StartMenu";
import Taskbar from "./Taskbar";
import GameDetails from "./GameDetails";
import SearchBar from "./elements/SearchBar";

const HomePage = () => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); 

  const handleStartButtonClick = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const handleGamesButtonClick = () => {
    setIsGamesOpen(!isGamesOpen);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game)
   };

  return (
    <div className={styles["home-page-container"]}>
      <StartMenu open={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
      <Taskbar onStartButtonClick={handleStartButtonClick} onGamesButtonClick={handleGamesButtonClick} />

      {isGamesOpen && (
        <SearchBar open={isGamesOpen} onClose={() => setIsGamesOpen(false)} onGameSelect={handleGameSelect} />
      )}
      {selectedGame && <GameDetails game={selectedGame} />}

    </div>
  );
};

export default HomePage;
