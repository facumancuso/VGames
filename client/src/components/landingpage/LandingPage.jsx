import React from "react";
import s from "../landingpage/landingPageCss.module.css";
import { NavLink } from "react-router-dom";
import giticon from "../../imagenes/githubIcon.png";
import linkicon from "../../imagenes/linkedIncon.png";

const LandingPage = (props) => {
  return (
    <div className={s.landingContainer}>
      <div className={s.text}>Videogames</div>
      <div className={s.iconsContainer}>
  <a href="https://github.com/facumancuso" target="_blank" rel="noreferrer"> 
    <img className={s.giticon} src={giticon} alt="github" /> 
  </a> 
  <a href="https://www.linkedin.com/in/facundo-mancuso-06394969/" target="_blank" rel="noreferrer">
    <img className={s.linkicon} src={linkicon} alt="linkedin" /> 
  </a>
</div>
      <div className={s.buttonDiv}>
        <NavLink className={s.button} to="/home"></NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
