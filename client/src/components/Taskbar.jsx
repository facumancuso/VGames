import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles/Taskbar.module.css";
import startButtonImage from "../assets/start-button.png";
import Google from "../assets/google.png";
import HomeIcon from "../assets/Power.png";
import AboutMe from "../assets/Command Prompt.png";
import Clock from "./elements/Clock";
import StartMenu from "./StartMenu";
import About from "./About";

const Taskbar = ({ onStartButtonClick, onGamesButtonClick }) => {
  const history = useHistory();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleStartButtonClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
    onStartButtonClick();
  };

  const handleGamesButtonClick = () => {
    onGamesButtonClick();
  };

  const handleHomeButtonClick = () => {
    history.push("/");
  };

  const handleAboutMeClick = () => {
    setIsAboutOpen(!isAboutOpen); 
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

      <span className={styles.gamesButton2} onClick={handleAboutMeClick}>
        <img src={AboutMe} alt="AboutMe" className={styles.gamesButton2} />
      </span>

      {isAboutOpen && <About onClose={() => setIsAboutOpen(false)} />}

      {/* <Clock className={styles.clock} /> */}
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
