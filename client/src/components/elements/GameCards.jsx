import React, { useState } from "react";
import styles from "../styles/GameCards.module.css";
import Pagination from "../Pagination";
import GameDetails from "../GameDetails";
import { useEffect } from "react";
function GameCards({ games, onGameSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  // Inicializamos el estado de los juegos con un array vacio
  const [currentGames, setCurrentGames] = useState([]);

  // Comprueba el juego antes de actualizar el estado
  useEffect(() => {
    if (games) {
      setCurrentGames(games);
    }
  }, [games]);
  

  // Calcular lal cantidad total de paginas
  const totalPages = Math.ceil(currentGames.length / gamesPerPage);

  // Calcular los juegos que se mostraran en la pagina
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const displayedGames = currentGames.slice(indexOfFirstGame, indexOfLastGame);

  // Fn para cambiar de pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div
      className={selectedGame ? styles.cardContainerView : styles.cardContainer}
    >
      <div className={styles.cards}>
        {displayedGames.map((game) => (
          <div
            key={game.id}
            className={styles.card}
            onClick={() => {
              if (selectedGame && selectedGame.id === game.id) {
                setSelectedGame(null);
              } else {
                setSelectedGame(game);
              }
            }}
          >
            <img src={game.background_image} alt={game.name} />
            <h2 className={styles.cardTitle}>{game.name || "N/A"}</h2>
            <h3 className={styles.cardSubtitle}>
              {game.genres && game.genres.join(", ")}
            </h3>
          </div>
        ))}
      </div>
      {selectedGame && (
        <div className={styles.gameDetails}>
          <GameDetails game={selectedGame} />
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
}

export default GameCards;
