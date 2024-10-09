import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Intermediate = () => {
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
    `Eating a balanced diet is essential for good health! It includes various food groups: fruits, vegetables, grains, proteins, and dairy. For example, aim for at least 5 servings of fruits and vegetables daily! Whole grains, like brown rice and whole wheat bread, provide energy and fiber. Protein sources, such as chicken, fish, beans, and nuts, are vital for muscle repair. Don’t forget about dairy products; they supply calcium for strong bones. Remember to drink 8 glasses of water each day to stay hydrated. By making these dietary choices, you can improve your energy levels and overall well-being!`,

    `Global warming refers to the long-term increase in Earth's average temperature, primarily due to human activities. The burning of fossil fuels releases greenhouse gases like CO₂ into the atmosphere. This process has led to a temperature rise of about 1.2°C since the late 19th century! As a result, we see melting ice caps, rising sea levels, and more frequent extreme weather events. Scientists warn that if we don’t take action, global temperatures could rise by 2°C or more by 2100! To combat global warming, individuals can reduce energy consumption, use public transport, and support renewable energy sources.`,

    `Regular physical activity is essential for maintaining a healthy lifestyle! Experts recommend at least 150 minutes of moderate aerobic activity each week. Activities like walking, cycling, or swimming can significantly improve cardiovascular health. Additionally, strength training should be included on 2 or more days per week to enhance muscle mass. Exercise also releases endorphins, which improve mood and reduce stress. Aim for a variety of activities to keep it interesting! Remember, consistency is key. Setting achievable fitness goals can help maintain motivation. A balanced approach to exercise promotes long-term health and can lead to a happier life!`,

    `Technology has transformed the educational landscape in recent years. Tools like computers, tablets, and smartphones are now essential for learning. Online courses and educational apps provide access to knowledge at any time, anywhere! With the rise of e-learning, students can learn at their own pace and explore diverse subjects. According to recent studies, students who use technology in the classroom score 15% higher than those who don’t. However, it’s important to balance screen time with traditional study methods. Educators must find effective ways to integrate technology into teaching to prepare students for the future workplace.`,

    `Climate change is one of the most pressing challenges of our time! Rising global temperatures are causing extreme weather patterns, impacting ecosystems, and threatening biodiversity. Over the past century, average temperatures have increased by approximately 1°C due to human activities. Melting polar ice caps and glaciers contribute to rising sea levels, which can flood coastal areas. According to scientists, if current trends continue, sea levels could rise by 1 meter by 2100. To combat climate change, it’s vital to reduce carbon emissions and promote renewable energy sources like solar and wind. Individual actions can collectively make a significant difference!`,

    `Cultural diversity enriches societies and fosters creativity. With over 7,000 languages spoken worldwide, understanding different cultures is essential. Engaging with diverse perspectives promotes empathy and tolerance! Festivals, cuisine, and art from various cultures can enhance community life. For instance, multicultural events can attract thousands of participants, celebrating traditions and heritage. However, globalization also poses challenges, such as cultural homogenization. It’s crucial to preserve unique cultural identities while embracing diversity. Education plays a significant role in promoting cultural awareness, enabling individuals to appreciate and respect differences. By embracing cultural diversity, we can create more inclusive and harmonious societies.`,

    `Environmental conservation is critical for protecting our planet! With the human population exceeding 7.9 billion, natural resources are being depleted at an alarming rate. Every year, millions of acres of forests are cut down, and wildlife habitats are destroyed. Conservation efforts aim to protect endangered species and restore ecosystems. Simple actions, like recycling, conserving water, and reducing waste, can significantly impact. Communities can establish protected areas to preserve biodiversity and promote sustainable practices. Educating others about the importance of conservation helps raise awareness. Together, we can work towards a healthier planet for future generations and ensure sustainable living.`,

    `Communication has evolved dramatically over the centuries. From ancient hieroglyphs to instant messaging, the ways we connect are constantly changing! The invention of the telephone in the 19th century revolutionized communication, allowing voices to travel long distances. Fast forward to today, and social media platforms connect billions of people worldwide. In fact, there are over 4.5 billion social media users globally! However, while technology has made communication easier, it has also led to challenges like misinformation and reduced face-to-face interactions. It’s crucial to balance digital communication with personal connections to foster meaningful relationships in our lives.`,

    `Lifelong learning is the continuous pursuit of knowledge throughout life! Whether through formal education or self-directed learning, acquiring new skills and information enhances personal and professional growth. Research shows that individuals who engage in lifelong learning are 25% more likely to experience job satisfaction. Online courses, workshops, and reading can expand knowledge in various fields. Additionally, learning new languages or skills promotes brain health and cognitive function. Setting personal learning goals, such as reading one book per month or taking a course every quarter, can keep you motivated. Embracing lifelong learning helps you adapt to changing circumstances and succeed in life.`,

    `Music has a profound impact on our emotions! Studies indicate that listening to music can release dopamine, the "feel-good" hormone, and improve mood. From upbeat tunes to calming melodies, music can evoke a wide range of feelings. Research shows that 70% of people use music to cope with stress or anxiety. Additionally, music therapy has been used to treat various mental health conditions, enhancing emotional well-being. Certain genres, like classical or jazz, may promote relaxation, while pop or rock can energize. Creating personalized playlists can help enhance productivity and emotional health, making music an essential part of our lives!`,
  ];

  const handleGenerateParagraph = () => {
    const randomPara = Math.floor(Math.random() * paragraph.length);
    setSelectedParagraph(paragraph[randomPara]);
  };

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

export default Intermediate;
