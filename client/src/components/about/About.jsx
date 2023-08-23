import React,{useState, useEffect} from "react";
import  aboutme from "../../imagenes/aboutme.jpeg"
import s from "./about.module.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getVideogames } from "../../redux/actions";
import Loading from "../loading/Loading";

export const About = () => {

   const dispatch = useDispatch();
  const [carga, setCarga] = useState(true);
  
  useEffect(() => {
    dispatch(getVideogames()).then(() =>setCarga(false));
  }, [dispatch]);


  if(carga){
    return (
      <div className={s.cargaDiv}>
        <Loading/>
      </div>
    )
  }

    return (
        <div className={s.divContainer}>
           <div className={s.SegContainer}>
            <h1 className={s.title}>
              Facundo Mancuso
            </h1>

            <div className={s.imgDiv}>
                <img className={s.img} src={aboutme} alt="cyberpunk" />
            </div>

            <div className={s.container}>
              
              
              <div className={s.containerDescrip}>
                <div className={s.lista}>

                    <ul>Un poco sobre mi: 
                      <li>Soy un entusiasta de la vida.</li>
                      <li>Me encantan los deportes, pero tengo una pasión alocada por el futbol.</li>
                      <li>Soy campeon del mundo... </li>
                      <li>He trabajado en muchas cosas, pero lo mas importante fue un emprendimiento propio.</li>
                      <li>Me dedique al mantenimiento de piscinas.</li>
                      <li>Trabajo hace 10 años, y 7 llevo por cuenta propia.</li>
                      <li>Mi sueño era ser programador, y poco a poco se esta volviendo realidad.</li>
                    </ul>
                
                </div>
                

              </div>
              
              
            </div>
            
            <div className={s.containerButton}>
                <NavLink className={s.detailButton} to={"/home"}>
                  Volver al inicio
                </NavLink>
            </div>

            </div>
        </div>
    )
};