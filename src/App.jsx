import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Entrance from "./Components/Entrance/Entrance";
import Theme from "./Components/Theme/Theme";
import { useEffect, useState } from "react";
import { ThemeContext, themes } from "./Components/Context/ThemeContext";
import Login from "./Components/Login/Login";
import GenerateData from "./Components/DataGenerate/GenerateData";
import Result from "./Components/Result";
function App() {
  const [theme, setTheme] = useState(themes.light);

  const handleOnClick = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  const body = document.body;
  useEffect(() => {
    switch (theme) {
      case themes.light:
        body.classList.remove("bg-dark");
        body.classList.remove("text-light");
        body.classList.add("bg-light");
        body.classList.add("text-dark");
        break;
      case themes.dark:
        body.classList.remove("bg-light");
        body.classList.remove("text-dark");
        body.classList.add("bg-dark");
        body.classList.add("text-light");
        break;

      default:
        body.classList.remove("bg-dark");
        body.classList.remove("text-light");
        body.classList.add("bg-light");
        body.classList.add("text-dark");
    }
  }, [theme]);
  return (
    <>
      <BrowserRouter>
        <ThemeContext.Provider value={{ theme, handleOnClick }}>
          <Theme />
          <Routes>
            <Route path="/" element={<Entrance />} />
            <Route path="/login" element={<Login />} />
            <Route path="/GenerateData" element={<GenerateData />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
