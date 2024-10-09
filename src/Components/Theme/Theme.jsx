import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Switch, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";

const Theme = () => {
  const { theme, handleOnClick } = useContext(ThemeContext);

  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#ffcc00",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#ffcc00",
    },
  }));

  return (
    <div
      style={{
        textAlign: "right",
        paddingTop: "1rem",
      }}
    >
      <FormControlLabel
        control={
          <ThemeSwitch
            checked={theme === "dark"}
            onChange={handleOnClick}
            name="themeMode"
            color="default"
          />
        }
        label={
          theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
        }
      />
    </div>
  );
};

export default Theme;
