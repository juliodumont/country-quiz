import { ResultCard } from "../../components/ResultCard";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useEffect, useState } from "react";
import { getQuestion } from "../../Types";
import axios, { AxiosRequestConfig } from 'axios';

const Game = () => {
  const show = false;

  const [gameStatus, setGameStatus] = useState({ end: false });
  const [points, setPoints] = useState(0);
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState([]);
  const question = getQuestion();

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) =>{
      console.log(response.data)
    }).catch((error)=>{
      console.log('Error')
    })
  });


  return (
    <div className="game-container">
      {!gameStatus.end ? (
        <QuizCard
          question={question[0]}
          additionalInfo={<div></div>}
        >
          {show && (
            <div className="button-container">
              <button>Next</button>
            </div>
          )}
        </QuizCard>
      ) : (
        <ResultCard correctAnswers={points} />
      )}
    </div>
  );
};

export default Game;

