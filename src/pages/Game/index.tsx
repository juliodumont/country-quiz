import { ResultCard } from "../../components/ResultCard";
import { QuestionAnswer } from "../../components/QuestionAnswer";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useState } from "react";

const Game = () => {
  const show = false;

  const [gameStatus, setGameStatus] = useState({ end: false });
  const [points, setPoints] = useState(0);

  return (
    <div className="game-container">
      {!gameStatus.end ? (
        <QuizCard
          question="Kuala Lumpur is the capital of"
          additionalInfo={<div></div>}
        >
          <QuestionAnswer questionAnswer="Vietnam" questionNumber="A" />
          <QuestionAnswer questionAnswer="Malaysia" questionNumber="B" />
          <QuestionAnswer questionAnswer="Sweden" questionNumber="C" />
          <QuestionAnswer questionAnswer="Austria" questionNumber="D" onClick={setGameStatus({end: true})}/>
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
