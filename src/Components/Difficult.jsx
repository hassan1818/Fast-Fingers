import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Difficult = () => {
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
    `La habilidad para comunicarse efectivamente es crucial en diversas facetas de la vida. Sin embargo, a menudo se pasa por alto la complejidad que implica el uso de un lenguaje rico y variado. Este fenómeno se traduce en una falta de comprensión y en interacciones ineficaces. Utilizar un vocabulario diverso no solo enriquece el discurso, sino que también permite que las ideas se transmitan con mayor claridad. El dominio del lenguaje puede abrir puertas a oportunidades inimaginables y facilitar la conexión entre individuos de diferentes contextos y culturas, lo que a su vez fomenta un diálogo significativo.`,

    ` La adquisición de conocimientos es un proceso continuo que se extiende a lo largo de toda la vida. Aprender no solo implica la absorción de información, sino también la habilidad para analizar, criticar y aplicar ese conocimiento en situaciones prácticas. Esta capacidad se nutre de la curiosidad innata que todos poseemos, lo que nos lleva a explorar nuevas ideas y perspectivas. Además, en un mundo en constante evolución, la adaptabilidad es fundamental para enfrentar los desafíos que surgen. Por lo tanto, invertir en el aprendizaje no solo enriquece nuestro intelecto, sino que también amplía nuestras posibilidades en un entorno competitivo.`,

    `La creatividad es un aspecto vital de la condición humana que se manifiesta de múltiples maneras. Desde la música hasta la literatura, esta habilidad permite a las personas expresar sus emociones y experiencias de maneras únicas. Sin embargo, la sociedad a menudo subestima el valor de la creatividad, favoreciendo enfoques más convencionales. Es esencial reconocer que la innovación surge de la capacidad de pensar de manera diferente y desafiar las normas establecidas. Fomentar un entorno que valore la creatividad no solo beneficia a los individuos, sino que también impulsa el progreso social y cultural de una comunidad.`,

    ` La influencia de la tecnología en la vida cotidiana es innegable y se ha intensificado en la era digital. Cada avance tecnológico trae consigo nuevas oportunidades, pero también desafíos que debemos abordar. La interconexión global, facilitada por la tecnología, ha transformado la forma en que nos comunicamos y compartimos información. Sin embargo, esta conectividad plantea preocupaciones sobre la privacidad y la seguridad. Es fundamental encontrar un equilibrio que permita disfrutar de los beneficios de la tecnología sin comprometer nuestros derechos. La educación digital se convierte en una herramienta crucial para navegar por este paisaje cambiante de manera segura y responsable.`,

    `La crisis ambiental actual exige una reevaluación urgente de nuestras prácticas diarias. La explotación desenfrenada de recursos naturales y la contaminación están llevando al planeta al borde del colapso. Adoptar un enfoque sostenible es fundamental para preservar el entorno para las futuras generaciones. Esto implica no solo reducir el consumo de recursos, sino también encontrar alternativas ecológicas y promover estilos de vida más responsables. La conciencia ambiental se ha convertido en una prioridad global y requiere la colaboración de todos los sectores de la sociedad para lograr un cambio significativo que beneficie a la Tierra y a sus habitantes.`,

    ` La globalización ha transformado radicalmente el panorama económico y cultural del mundo. Si bien ha facilitado el comercio y el intercambio de ideas, también ha creado tensiones entre diferentes culturas y economías. La homogeneización cultural es una preocupación que surge a medida que las tradiciones locales se ven amenazadas por influencias externas. Es imperativo encontrar un equilibrio que permita disfrutar de los beneficios de la globalización sin sacrificar la diversidad cultural. La educación y el diálogo intercultural son herramientas esenciales para fomentar el entendimiento y la apreciación de las diferencias, enriqueciendo así nuestras sociedades.`,

    ` La salud mental es un aspecto esencial del bienestar general que a menudo se pasa por alto. Vivimos en una sociedad que valora el éxito material, pero ignora las necesidades emocionales de las personas. Es crucial reconocer que el bienestar mental no solo afecta la calidad de vida individual, sino también el funcionamiento de la comunidad en su conjunto. Fomentar un ambiente que apoye la salud mental implica derribar estigmas y promover recursos accesibles. Invertir en el bienestar emocional de las personas es una responsabilidad compartida que puede conducir a una sociedad más saludable y resiliente.`,

    ` El voluntariado es una forma poderosa de contribuir a la comunidad y marcar la diferencia en la vida de otros. A través de acciones desinteresadas, los voluntarios abordan problemas sociales y ambientales que afectan a sus vecinos y a la sociedad en general. Esta dedicación no solo beneficia a quienes reciben apoyo, sino que también enriquece la vida de los voluntarios al proporcionarles un sentido de propósito y conexión. La participación en actividades comunitarias fomenta la empatía y la solidaridad, y se convierte en un catalizador para el cambio social positivo. Promover el voluntariado es esencial para construir comunidades más unidas y resilientes.`,

    `El arte ha sido una forma de expresión humana desde tiempos inmemoriales, reflejando la cultura y la historia de cada época. A lo largo de los años, el arte ha evolucionado y se ha adaptado a las cambiantes realidades sociales y tecnológicas. Desde la pintura clásica hasta las instalaciones contemporáneas, cada forma artística ofrece una visión única de la condición humana. Además, el arte desempeña un papel crucial en la promoción del pensamiento crítico y la reflexión sobre temas sociales. Fomentar el acceso y la apreciación del arte en todas sus formas es esencial para el desarrollo cultural de una sociedad.`,

    `El desarrollo personal es un viaje continuo que nos lleva a explorar nuestras habilidades y limitaciones. Este proceso requiere introspección y una voluntad genuina de crecer. A medida que nos conocemos mejor, podemos identificar áreas en las que deseamos mejorar y establecer metas significativas. El autoconocimiento nos permite tomar decisiones más informadas y vivir de manera más auténtica. Además, el desarrollo personal fomenta la resiliencia y la adaptabilidad, cualidades esenciales en un mundo en constante cambio. Invertir en nuestro crecimiento personal no solo beneficia nuestra vida individual, sino que también contribuye a crear comunidades más fuertes y cohesionadas.`,
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

export default Difficult;
