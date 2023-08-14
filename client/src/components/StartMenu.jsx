import React from "react";
import styles from "./styles/StartMenu.module.css";
import CreateGame from './CreateGame';

const StartMenu = ({ open, onClose }) => {
  return (
    <div>
      {/* <div className={styles.titleBar}> */}
        <div className={styles.titleBarControls}></div>
      {/* </div> */}
      {open && (
        <div className={styles.startMenu}>
          <CreateGame />
        </div>
      )}
    </div>
  );
};

export default StartMenu;


