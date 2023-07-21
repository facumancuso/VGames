require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Videogame, Genre } = require("../db");

//TODO  ------> GET /videogame/:idVideoGame <-------

// consulto el detalle del juego por el ID
router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;

  //verifico si es un juego creado y me trae el detalle de la DB
  if (idVideogame.includes("-")) {
    let videogameDb = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: Genre,
    });
    //Parseo el objeto
    videogameDb = JSON.stringify(videogameDb);
    videogameDb = JSON.parse(videogameDb);

    //dejo un array con los nombres de genero solamente
    videogameDb.genres = videogameDb.genres.map((g) =>
      typeof g === "object" ? g.name.toString() : g
    );
    res.json(videogameDb);
  } else {
    //else (si no es un juego creado, voy a buscar la info a la API)
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      let {
        id,
        name,
        background_image,
        genres,
        description,
        released: releaseDate,
        rating,
        platforms,
      } = response.data;
      genres = genres.map((g) => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
      platforms = platforms.map((p) => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
      return res.json({
        id,
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms,
      });
    } catch (err) {
      return console.log(err);
    }
  }
});

//TODO  ------> POST /videogame <-------

router.post("/", async (req, res) => {
  let { name, description, releaseDate, rating, genres, platforms } = req.body;
  if (!platforms) {
    return res
      .status(400)
      .json({ error: "Platforms property is missing in the req.body." });
  }
  if (!Array.isArray(platforms)) {
    return res
      .status(400)
      .json({ error: "Platforms property should be an array." });
  }
  platforms = platforms.join(", ");
  try {
    const gameCreated = await Videogame.findOrCreate({
      where: {
        name,
        description,
        releaseDate,
        rating,
        platforms,
      },
    });

    const genreNames = genres; // Assuming genres is an array of genre names
    const associatedGenres = await Genre.findAll({
      where: { name: genreNames },
    });

    const genreIds = associatedGenres.map((genre) => genre.id);
    await gameCreated[0].setGenres(genreIds);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
  res.send("Created game successfully.");
});
module.exports = router;
