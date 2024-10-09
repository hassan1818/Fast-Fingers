import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Beginner from "../Beginner";
import Intermediate from "../Intermediate";
import Difficult from "../Difficult";
import Spline from "@splinetool/react-spline";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for menu open/close
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    const storedLevel = localStorage.getItem("selectedLevel");
    if (storedLevel) {
      setSelectedLevel(storedLevel);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (level) => {
    setAnchorEl(null);
    if (level) {
      setSelectedLevel(level);
      localStorage.setItem("selectedLevel", level);
    }
  };

  const buttonText = selectedLevel
    ? selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)
    : "Select Level";

  return (
    <>
      {/* Background Spline 3D Element */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1, // Set Spline behind the content
          opacity: 0.6,
        }}
      >
        <Spline scene="https://prod.spline.design/sIaG8e4dOQO7lNBg/scene.splinecode" />
      </Box>

      {/* Navigation and Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <AppBar
          position="static"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
            bgcolor: "#1376a2",
            borderRadius: 2,
          }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Button
              color="inherit"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
            >
              {buttonText}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose(null)}
            >
              <MenuItem onClick={() => handleClose("beginner")}>
                Beginner
              </MenuItem>
              <MenuItem onClick={() => handleClose("intermediate")}>
                Intermediate
              </MenuItem>
              <MenuItem onClick={() => handleClose("difficult")}>
                Difficult
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Main Content Section */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // mt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            p: 3,
            borderRadius: 6,
            width: "60%",
            bgcolor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          {selectedLevel === "beginner" && <Beginner />}
          {selectedLevel === "intermediate" && <Intermediate />}
          {selectedLevel === "difficult" && <Difficult />}
          {!selectedLevel && (
            <Typography
              variant="h3"
              style={{ color: "red", fontWeight: "bolder" }}
            >
              Please select a level to play the game.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
