import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles/Taskbar.module.css";
import StartMenu from "./StartMenu";
import startButtonImage from "../assets/start-button.png";
import Google from "../assets/google.png";
import HomeIcon from "../assets/apagado.png";
import Clock from "./elements/Clock";
const Taskbar = ({ onStartButtonClick, onGamesButtonClick }) => {
  const history = useHistory();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleStartButtonClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
    onStartButtonClick();
  };

  const handleGamesButtonClick = () => {
    onGamesButtonClick();
  };
  const handleHomeButtonClick = () => {
    history.push("/"); // Cambia esto por la ruta de tu página de inicio
  };

  return (
    <div className={styles.taskbar}>
      <span className={styles.startButton} onClick={handleStartButtonClick}>
        <img
          src={startButtonImage}
          alt="Start Button"
          className={styles.startButtonImage}
        />
      </span>
      {isStartMenuOpen && (
        <StartMenu
          open={isStartMenuOpen}
          onClose={() => setIsStartMenuOpen(false)}
        />
      )}

      <span className={styles.gamesButton} onClick={handleGamesButtonClick}>
        <img src={Google} alt="Google" className={styles.gamesButton} />
      </span>

      <Clock className={styles.clock} />   
      <span className={styles.homeButton} onClick={handleHomeButtonClick}>
        <img
          src={HomeIcon}
          alt="LandingPage"
          className={styles.homeButtonImage}
        />
      </span>
    </div>
  );
};

export default Taskbar;
