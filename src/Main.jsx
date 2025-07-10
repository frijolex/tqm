import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import emoji from "./assets/emoji.png";
import health from "./assets/health.png";

export default function Main() {
  const { id } = useParams();

  const [phrase, setPhrase] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`https://for-bell-api.vercel.app/${id}`)
        .then(response => response.json())
        .then(data => { setPhrase(data.phrase); setQuestion(data.question); })
    }
  }, [id]);

  var noButtonTranslate = 0
  const noButton = useRef()
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const answers = [
    "Estás dispuesta a responder algunas preguntas (?)",
    "Responderás con total sinceridad (?)",
    "Tienes certeza de que desea continuar (?)",
    !question ? "Saldrías conmigo la semana que viene? 💖✨" : question,
  ]

  const handleYesAnswerButton = () => {
    setCurrentAnswer(currentAnswer + 1)
  }
  const handleNoAnswerButton = () => {
    if (noButtonTranslate === 0) {
      noButton.current.style.transform = "translateX(100px)"
      noButtonTranslate = 1
    } else {
      noButton.current.style.transform = "translateX(0px)"
      noButtonTranslate = 0
    }
  }


  return (
    <div className="flex flex-col w-full min-h-screen items-center pt-14">
      <img src={emoji} alt="" width={200} />

      <div className="flex flex-col mt-10 min-w-full items-center">
        <p className="text-sms font-semibold break-words" align="center">{answers[currentAnswer]}</p>

        <div className="flex mt-10 gap-4">
          {currentAnswer < answers.length ? (
            <>
              <button
                onClick={handleYesAnswerButton}
                className="bg-tertiary text-secondary font-bold px-6 py-2 rounded border-primary border-r-2 border-b-2 active:bg-secondary active:color-tertiary transition-colors duration-300"
              >
                chi
              </button>

              {currentAnswer === answers.length - 1 && (
                <button
                  ref={noButton}
                  onClick={handleNoAnswerButton}
                  className="bg-tertiary text-secondary font-bold px-6 py-2 rounded border-primary border-r-2 border-b-2 active:bg-secondary active:text-tertiary transition-colors duration-300"
                >
                  ño
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {!id ? (
                <>
                  <p className="font-semibold" align="center">"
                    <b>Eres una rosa de algodón bajo la luna.</b> - Juan
                  </p>

                  <p align="center">Te quiero mucho Gabriela, eres mi esperanza sin supervisión.</p>

                  <img src={health} alt="" width={200} />

                
              ) : (
                <>
                  <p className="font-semibold max-w-md" align="center">
                    <b>{phrase}</b>
                  </p>
                  <img src={health} alt="" width={200} />

                  
              )}
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
