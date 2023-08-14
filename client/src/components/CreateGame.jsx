import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import ImgCVG from "../assets/Joystick.png";
import styles from "./styles/CreateGame.module.css";

const acceptedGenres = [
  "Action",
  "Indie",
  "Adventure",
  "RPG",
  "Strategy",
  "Shooter",
  "Casual",
  "Simulation",
  "Puzzle",
  "Arcade",
  "Platformer",
  "Racing",
  "Massively-Multiplayer",
  "Sports",
  "Fighting",
  "Family",
  "Board Games",
  "Educational",
  "Card",

];
const acceptedPlatforms = [
  "PC",
  "iOS",
  "Android",
  "macOS",
  "PlayStation 4",
  "PlayStation 5",
  "XBOX",
  "PS Vita",
];

function CreateGame() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: null,
    releaseDate: "",
  });

  // const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    const newValue =
      type === "checkbox"
        ? checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value)
        : type === "file"
        ? files[0]
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  

  const validateForm = () => {
    let newErrors = {};
    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    // Description is required
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createGame = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/videogame/",
          formData
        );
        console.log("Game created successfully:", response.data);

        setFormData({
          name: "",
          description: "",
          rating: "",
          genres: [],
          platforms: [],
          background_image: null,
        });

        setSuccessMessage("Game created successfully!");

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error creating game:", error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={ImgCVG} alt="GameImage" />
        <h1 className={styles.h1}>Create a New Game</h1>
      </header>
      <form className={styles.form}>
        <div className={styles.leftColumn}>
          <label className={styles.label}>
            Name:
            <input type="text" name="name" className={styles.input} onChange={handleInputChange}/>
          </label>

          <label className={styles.label}>
            Description:
            <input type="text" name="description" onChange={handleInputChange}/>
          </label>

          <label className={styles.label}>
            Rating:
            <input type="number" name="rating" onChange={handleInputChange} />
          </label>

          <label className={styles.label}>
            Image:
            <input type="text" name="background_image" onChange={handleInputChange} />
          </label>

          <label className={styles.label}>
            Release Date:
            <input type="date" name="releaseDate" onChange={handleInputChange}/>
          </label>
        </div>

        <div className={styles.middleColumn}>
          <label className={styles.label}>
            Platforms:
            <div className={styles.checkboxContainer}>
              {acceptedPlatforms.map((platform) => (
                <div key={platform}>
                  <input type="checkbox" name="platforms" value={platform.toLowerCase()} onChange={handleInputChange} />
                  {" "} {platform}
                </div>
              ))}
            </div>
          </label>
        </div>

        <div className={styles.rightColumn}>
          <label className={styles.label}>
            Genres:
            <div className={styles.checkboxContainer}>
              {acceptedGenres.map((genre) => (
                <div key={genre}>
                <input type="checkbox" name="genres" value={genre} onChange={handleInputChange}/>
                  {" "} {genre}
                </div>
              ))}
            </div>
          </label>
        </div>

        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={createGame}>
            Create Game
          </button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CreateGame;
