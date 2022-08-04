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
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState([]);

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
    console.log(event.currentTarget.textContent)
  };

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //SetRegion aqui
    console.log(event.target)
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
            showButton={false}
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
