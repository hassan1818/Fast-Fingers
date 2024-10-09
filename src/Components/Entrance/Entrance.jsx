import React, { useContext } from "react";
import styles from "./Entrance.module.css";
import { Button } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Entrance = () => {
  const { theme } = useContext(ThemeContext); //Destructure to get theme value

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/login");
  };

  return (
    <div
      className={`${styles.container} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.text}>
        <h1 className={`${theme === "dark" ? "text-white" : "text-dark"}`}>
          <span style={{ color: theme === "dark" ? "#fff" : "#000" }}>
            {" "}
            Welcome To
          </span>{" "}
          <TypeAnimation
            sequence={[`Fast Fingers.`, 3000, "", 500]}
            speed={200}
            repeat={Infinity}
          />
        </h1>
        <p className={`${theme === "dark" ? "text-white" : "text-dark"}`}>
          Unlock your typing potential with Fast Fingers, the ultimate online
          typing master platform designed for everyone, from beginners to
          advanced typists. Our interactive exercises and engaging challenges
          will help you improve your typing speed and accuracy in a fun and
          dynamic way. At Fast Fingers, we believe that typing is an essential
          skill in today’s digital world. Whether you’re looking to enhance your
          productivity at work, excel in school, or simply enjoy typing
          challenges, we’ve got you covered!
        </p>
        <Button
          variant="contained"
          onClick={handleNavigation}
          style={{ background: "#1376a2" }}
        >
          Click here to Login !
        </Button>
      </div>
      <div className={styles.img}></div>
    </div>
  );
};

export default Entrance;
