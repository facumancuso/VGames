const fetch = require("cross-fetch");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

//apigameinfo trae 5 pag concatenadas de info sobre juegos
//dbGamesinfo trae los juegos dentro de nuestra base de datos
//gamesInfo concatena apigameinfo y dbgameinfo
//listGames mapea toda la info dentro de GamesInfo y devuelve sus propiedades en un objeto
const getGames = async (name = "") => {
  try {
    const pageLimit = 20; // Number of games per page
    const totalPages = 5; // Total number of pages

    const promises = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&search=${name}`;
      promises.push(axios.get(url));
    }

    const responses = await axios.all(promises);

    const apiGamesInfo = responses.reduce((games, response) => {
      const data = response.data.results;
      return games.concat(data);
    }, []);

    const apiGames = apiGamesInfo.map((game) => ({
      id: game.id,
      name: game.name,
      released: game.released,
      background_image: game.background_image,
      rating: game.rating,
      platforms: game.platforms.map((platform) => platform.platform.name),
      genres: game.genres.map((genre) => genre.name),
      createdInDb: false, // Since this is an API game
    }));

    const dbGamesInfo = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const gamesInfo = apiGames.concat(dbGamesInfo);

    const listGames = gamesInfo.map((game) => ({
      name: game.name,
      id: game.id,
      released: game.released,
      image: game.background_image,
      platforms: game.platforms,
      genres: game.genres,
      rating: game.rating,
      createdInDb: game.createdInDb,
    }));

    return listGames;
  } catch (error) {
    throw error;
  }
};

const gameId = async (id) => {
  try {
    if (!isNaN(id)) {
      const responseApi = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => data);

      const gameApiInfo = {
        image: responseApi.background_image,
        name: responseApi.name,
        genres: responseApi.genres,
        description: responseApi.description,
        released: responseApi.released,
        rating: responseApi.rating,
        platforms: responseApi.platforms.map((p) => p.platform.name).toString(),
      };

      return gameApiInfo;
    }
  } catch (error) {
    return error;
  }

  try {
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)
    ) {
      const responseDb = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const gameDbInfo = {
        background_image: responseDb.dataValues.background_image,
        name: responseDb.dataValues.name,
        genres: responseDb.dataValues.genres,
        description: responseDb.dataValues.description,
        released: responseDb.dataValues.released,
        rating: responseDb.dataValues.rating,
        platforms: responseDb.dataValues.platforms,
        createInDb: responseDb.dataValues.createdInDb,
      };

      return gameDbInfo;
    }
  } catch (error) {
    return error;
  }
};

const createGame = async (
  name,
  description,
  released,
  rating,
  background_image,
  Genres,
  platforms
) => {
  try {
    if (!name || !description || !platforms || !background_image) {
      throw "faltan datos para crear el juego";
    } else {
      const newGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        background_image,
        Genres,
        platforms,
      });

      const newGenre = await Genre.findAll({
        where: {
          name: Genres,
        },
      });

      newGame.addGenre(newGenre);
      return newGame;
    }
  } catch (error) {
    return error;
  }
};

const getGenres = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => data);

    const genresApi = await response.results.map((e) => e.name);

    genresApi.map((e) =>
      Genre.findOrCreate({
        where: { name: e },
      })
    );

    const allGenres = await Genre.findAll();

    return allGenres;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getGames,
  gameId,
  createGame,
  getGenres,
};
