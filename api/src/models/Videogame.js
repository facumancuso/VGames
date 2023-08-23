// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo para VIDEOGAME
//   sequelize.define('videogame', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },
//     description: {
//       // type: DataTypes.TEXT,
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     platforms: {
//       // type: DataTypes.TEXT,
//       type: DataTypes.ARRAY(DataTypes.STRING),

//       allowNull: false
//     }, 
//     released: {
//       type: DataTypes.DATEONLY
//     },
//     // releaseDate: {
//     //   type: DataTypes.STRING
//     // },
//     rating: {
//       // type: DataTypes.INTEGER
//       type: DataTypes.FLOAT,
//       validate: {
//         min: 1.0,
//         max: 5,
//       }
//     },
//     background_image: {
//       type: DataTypes.STRING,
//       allowNull: true, 
//     },
//   }, {timestamps: true,
//       createdAt: 'creado',
//       updatedAt: false
//   });
// };


const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //define sirve para crear un modelo para la tabla
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1.0,
        max: 5,
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
   
  },
  {
    timestamps: false,
  });
};
