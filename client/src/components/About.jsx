import React from 'react';
import styles from './styles/About.module.css';

const AboutMe = () => {
  return (
    <div className={styles.content}>
      <h2>About Me</h2>
      <p>
        ¡Hola! Soy Facu, y me encanta el fútbol.
      </p>
      <p>
        Somos campeones del mundo.
      </p>
    </div>
  );
}

export default AboutMe;
