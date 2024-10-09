import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Result from "./Result";
const Beginner = () => {
  const [selectedParagraph, setSelectedParagraph] = useState("");
  const [storedParagraph, setStoredParagraph] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Storedpara = localStorage.getItem("Stored Paragraph");
    if (storedParagraph) {
      setStoredParagraph(Storedpara);
    }
  }, []);
  const paragraph = [
    `The solar system is a fascinating place filled with various celestial bodies. At its center is the Sun, a massive star that provides light and heat to the planets orbiting around it. There are eight major planets, including Earth, which is our home. The planets have different characteristics, such as size, atmosphere, and surface conditions. For example, Mercury is the closest planet to the Sun and has a very thin atmosphere, while Jupiter is the largest planet and has a thick atmosphere filled with storms. Exploring the solar system helps us understand our place in the universe.`,

    `Water is essential for life on Earth. All living organisms, including humans, need water to survive. It plays a crucial role in various bodily functions, such as digestion and temperature regulation. Additionally, water is vital for plants, as it helps them grow and produce oxygen. Freshwater sources, like rivers and lakes, provide habitats for many species and are important for agriculture. Unfortunately, water pollution and scarcity are major global challenges. It is essential to conserve water and protect our water sources to ensure a sustainable future for all living beings.`,

    `Eating a balanced diet is crucial for maintaining good health. A healthy diet includes a variety of foods from different food groups, such as fruits, vegetables, grains, proteins, and dairy. Fruits and vegetables provide essential vitamins and minerals, while whole grains supply fiber for digestion. Proteins, found in meat, beans, and nuts, are necessary for building and repairing tissues. Drinking enough water is also important for staying hydrated. Avoiding processed foods high in sugar and fat can help prevent health issues. Making healthy food choices can improve energy levels and overall well-being.`,

    `Mathematics is an essential skill used in everyday life. It helps us solve problems, manage finances, and make decisions. Basic math includes addition, subtraction, multiplication, and division. Addition is the process of combining two or more numbers to find their total. Subtraction involves taking one number away from another. Multiplication is a quicker way of adding the same number multiple times, while division splits a number into equal parts. Learning these basic operations lays the foundation for more advanced math concepts. Practicing math regularly can improve your skills and build confidence.`,

    `Reading is a valuable skill that opens up a world of knowledge and imagination. It helps improve vocabulary, comprehension, and critical thinking skills. Reading books, articles, and stories exposes us to new ideas and cultures. It can also enhance creativity by stimulating the imagination. Regular reading can be beneficial for mental health, as it provides an escape from daily stressors. Whether it’s fiction, non-fiction, or poetry, reading offers a way to relax and learn. Encouraging children to read from an early age sets the stage for a lifelong love of learning.`,

    `Weather refers to the atmospheric conditions in a specific place at a given time. It includes elements such as temperature, humidity, precipitation, and wind. Meteorologists study weather patterns to predict changes in the atmosphere. They use tools like satellites, radar, and weather balloons to gather data. Understanding the weather is important for planning daily activities, such as dressing appropriately or scheduling outdoor events. Severe weather events, like storms and hurricanes, can have significant impacts, so staying informed through weather reports helps people prepare and stay safe.`,

    `Regular physical activity is vital for maintaining a healthy lifestyle. Exercise helps improve cardiovascular health, strengthen muscles, and enhance flexibility. It can also boost mood and reduce stress by releasing endorphins, known as "feel-good" hormones. Engaging in activities like walking, jogging, swimming, or playing sports can provide social interaction and enjoyment. Experts recommend at least 150 minutes of moderate exercise each week for adults. Incorporating exercise into daily routines can lead to improved overall health and increased energy levels, making it easier to enjoy everyday activities.`,

    `Recycling is the process of converting waste materials into new products. It helps reduce the amount of garbage that ends up in landfills, conserves natural resources, and saves energy. Common recyclable materials include paper, plastic, glass, and metal. Many communities provide recycling bins for residents to separate recyclable items from regular trash. Educating others about recycling encourages everyone to participate in protecting the environment. Small actions, such as using reusable bags and bottles, can make a big difference. By recycling, we contribute to a cleaner and healthier planet for future generations.`,

    `Computers have become an integral part of our daily lives. They help us communicate, work, and access information quickly. With the internet, we can connect with people worldwide and share ideas instantly. Computers are used in various fields, including education, healthcare, and business. They enhance productivity and efficiency by automating tasks and managing data. Learning basic computer skills is essential in today’s technology-driven society. From typing documents to using software applications, being computer literate opens up many opportunities for personal and professional growth.`,

    `Sleep is essential for good health and well-being. It allows our bodies to rest, repair, and rejuvenate. During sleep, the brain processes information and consolidates memories. Most adults need 7 to 9 hours of sleep each night to function optimally. Lack of sleep can lead to various health problems, including fatigue, poor concentration, and weakened immune function. Establishing a consistent sleep schedule and creating a comfortable sleep environment can improve sleep quality. Prioritizing sleep is crucial for maintaining energy levels and overall health.`,
  ];

  const handleGenerateParagraph = () => {
    const randomPara = Math.floor(Math.random() * paragraph.length);
    const selectedPara = paragraph[randomPara];
    setSelectedParagraph(selectedPara);

    localStorage.setItem("Stored Paragraph", selectedPara);
  };

  // Code for typing game
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [charIndex, setCharIndex] = useState(0); //How many user wrotes. stores index of those characters.
  const [isTyping, setIsTyping] = useState(false);
  const [correctWrong, setCorrectWrong] = useState([]);

  const inputRef = useRef(null);
  const charRef = useRef([]);

  useEffect(() => {
    // Focus input only if it's rendered
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setCorrectWrong(Array(charRef.current.length).fill(""));
  }, [selectedParagraph]);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        let correctChars = charIndex - mistakes;
        let totalTimeTaken = maxTime - timeLeft;

        let cpm = correctChars * (60 / totalTimeTaken);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(parseInt(cpm, 10));

        let wpm = Math.round((correctChars / 5 / totalTimeTaken) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsTyping(false);
      navigate("/result", { state: { WPM, CPM, mistakes } });
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft]);

  const resetGame = () => {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);
    setCorrectWrong(Array(charRef.current.length).fill(""));
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const characters = charRef.current; // access all characters
    let currentChar = charRef.current[charIndex];
    let typedChar = e.target.value.slice(-1); //extract last character of the string which is typed.

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }

      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = "correct";
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        correctWrong[charIndex] = "wrong";
      }

      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }
    } else {
      setIsTyping(false);
    }
  };
  return (
    <>
      <Stack>
        <Box>
          {!selectedParagraph && (
            <Button
              variant="contained"
              onClick={handleGenerateParagraph}
              style={{ background: "#1376a2" }}
            >
              Generate Paragraph!
            </Button>
          )}
        </Box>

        {selectedParagraph && (
          <div
            className="container"
            style={{
              border: "2px solid gray",
              marginTop: "1rem",
              borderRadius: "10px",
              padding: "3px 12px 3px 12px",
            }}
          >
            <p style={{ marginTop: "20px", fontSize: "20px", lineHeight: "2" }}>
              <input
                type="text"
                className="input-field"
                ref={inputRef}
                onChange={handleChange}
              />
              {selectedParagraph.split("").map((char, index) => (
                <span
                  key={index}
                  className={`char ${index === charIndex ? "active" : ""} ${
                    correctWrong[index]
                  }`}
                  ref={(e) => (charRef.current[index] = e)}
                >
                  {char}
                </span>
              ))}
            </p>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Time Left: <strong>{timeLeft}</strong>
              </p>
              <button className="btn" onClick={resetGame}>
                Try Again
              </button>
            </Box>
          </div>
        )}
      </Stack>
    </>
  );
};

export default Beginner;
