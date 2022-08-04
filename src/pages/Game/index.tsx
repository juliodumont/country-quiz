import { ResultCard } from "../../components/ResultCard";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useEffect, useState } from "react";
import { CountryInfo } from "../../Types";
import axios from "axios";
import { getAnswers, getNewQuestion } from "../../utils/question";
import { requestCountriesInfo } from "../../utils/request";
import { StartCard } from "../../components/StartCard";

const testQuestionSet = [
  {
    id: "A",
    text: "Brazil",
    type: true,
  },
  {
    id: "B",
    text: "United States",
    type: false,
  },
  {
    id: "C",
    text: "Italy",
    type: false,
  },
  {
    id: "D",
    text: "Argentina",
    type: false,
  },
];

const Game = () => {
  const show = true;
  const [countryList, setCountryList] = useState<CountryInfo[]>();

  const [gameStatus, setGameStatus] = useState({ start: false, end: true });
  const [points, setPoints] = useState(0); //Acho que isso não é estado
  const [next, setNext] = useState(false);
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState<string[]>([
    "unset",
    "unset",
    "unset",
    "unset",
  ]);

  useEffect(() => {
    //requestCountriesInfo(["europe"]);
    //getNewQuestion();
  }, []);

  const handleTryAgainClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPoints(0);
    setGameStatus({ start: true, end: false });
  };

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //SetRegion aqui
    setGameStatus({ start: false, end: false });
  };

  const onRegionSelectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.textContent);
  };

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const answer = target.textContent?.slice(1);
    const questionStatus = [] as string[];
    testQuestionSet.forEach((question) => {
      if (question.type == false && question.text != answer) {
        questionStatus.push("disabled");
      } else if (question.type == true) {
        questionStatus.push("true");
        if(question.text == answer){
          setPoints(points + 1);
        }
      } else if (question.type == false && question.text == answer) {
        questionStatus.push("false");
      }
    });
    setNext(true);
    setCurrentQuestionStatus(questionStatus);
  };

  return (
    <div className="game-container">
      {!gameStatus.end ? (
        gameStatus.start ? (
          <StartCard
            title="Country quiz"
            onClick={handleStartClick}
            onRegionSelect={onRegionSelectClick}
            userMessage="Select regions:"
          />
        ) : (
          <QuizCard
            title="Country quiz"
            answers={testQuestionSet}
            question={"Brasilia is the capital of which country?"}
            showButton={next}
            onAnswerClick={handleAnswerClick}
            questionStatus={currentQuestionStatus}
          />
        )
      ) : (
        <ResultCard
          title="Country quiz"
          correctAnswers={points}
          onClick={handleTryAgainClick}
        />
      )}
    </div>
  );
};

export default Game;
