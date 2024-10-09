import React, { useContext, useState } from "react";
import { Stack, Typography, Grid, TextField, Button } from "@mui/material";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [saveUsers, setSaveUsers] = useState([]);

  const handleAddUsers = (e) => {
    e.preventDefault();

    if (userName.trim() === "") {
      alert("Please enter your Name!");
    } else if (userEmail.trim() === "") {
      alert("Please enter your Email!");
    } else if (userPassword.trim() === "") {
      alert("Please enter your Password!");
    } else {
      const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
      const newUser = {
        id: Date.now(),
        userName,
        userEmail,
        userPassword,
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("Users", JSON.stringify(updatedUsers));
      setSaveUsers(updatedUsers);

      setUserName("");
      setUserEmail("");
      setUserPassword("");

      navigate("/GenerateData", { state: { userName } });
    }
  };

  return (
    <Grid container justifyContent="center" style={{ height: "88vh" }}>
      <Grid item>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "5px solid #1376a2",
            padding: "35px",
            borderRadius: "8px",
            my: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: "bolder" }}
            className="formHeading"
          >
            Enter Login Data!
          </Typography>
          <form onSubmit={handleAddUsers}>
            <TextField
              label="UserName"
              name="UserName"
              placeholder="Muhammad Hassan"
              fullWidth
              margin="normal"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                style: {
                  borderColor: theme === "dark" ? "gray" : "orange",
                  color: theme === "dark" ? "#fff" : "#000", // Input text color
                },
              }}
              InputLabelProps={{
                style: {
                  borderColor: theme === "dark" ? "gray" : "orange",
                  color: theme === "dark" ? "#1376a2" : "#000", // Input label color
                },
              }}
              variant="outlined"
            />

            <TextField
              label="Email"
              name="Email"
              placeholder="user@gmail.com"
              fullWidth
              margin="normal"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              InputProps={{
                style: {
                  borderColor: theme === "dark" ? "gray" : "orange",
                  color: theme === "dark" ? "#fff" : "#000", // Input text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: theme === "dark" ? "#1376a2" : "#000", // Input label color
                },
              }}
              variant="outlined"
            />

            <TextField
              label="Password"
              name="Password"
              placeholder="xyz@123"
              fullWidth
              margin="normal"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              InputProps={{
                style: {
                  borderColor: theme === "dark" ? "gray" : "orange",
                  color: theme === "dark" ? "#fff" : "#000", // Input text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: theme === "dark" ? "#1376a2" : "#000", // Input label color
                },
              }}
              variant="outlined"
            />

            <Stack direction="row" justifyContent="center" sx={{ my: "10px" }}>
              <Button
                variant="contained"
                style={{ background: "#1376a2" }}
                type="submit"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
