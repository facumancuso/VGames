import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";
import ButtonImage from '../assets/ProfileLP.png'

const LandingPage = () => {
  return (
    <div className={styles['landing-page-container']}>
      <div className={styles['button-wrapper']}>
        <img src={ButtonImage} alt='Button' className={styles['button-image']} />
        <div className={styles['enter-button-container']}>
          <Link to='/home' className={styles['enter-button']}>Game Mode</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;