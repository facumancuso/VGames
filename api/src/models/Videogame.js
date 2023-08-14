const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo para VIDEOGAME
  // modelName / attributes / options
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    releaseDate: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true, // change this to 'false' if an image is always required
    },
  }, {timestamps: true,
      createdAt: 'creado',
      updatedAt: false
  });
};