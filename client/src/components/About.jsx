import React from 'react';
import styles from './styles/About.module.css';

const AboutMe = () => {
  return (
    <div className={`${styles.content} console-container`}>
      <div className={styles.titleBar}>
        <h2>Facundo Mancuso</h2>
      </div>
      <pre className="console-text">
        <p>
          ¡Hola! Estoy haciendo la app de videogames.
        </p>
        <p>
          Me estoy volviendo loco..
        </p>
        <p>
          Pero me consuela que somos campeones del mundo.
        </p>
      </pre>
    </div>
  );
}

export default AboutMe;
