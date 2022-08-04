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

  const [gameStatus, setGameStatus] = useState({ start: true, end: false });
  const [points, setPoints] = useState(0); //Acho que isso não é estado
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState([]);

  useEffect(() => {
    //requestCountriesInfo(["europe"]);
    //getNewQuestion();
  }, []);

  return (
    <div className="game-container">
      {!gameStatus.end ? (
        gameStatus.start ? (
          <StartCard />
        ) : (
          <QuizCard
            title="Country quiz"
            answers={testQuestionSet}
            question={"Brasilia is the capital of which country?"}
            showButton={false}
          />
        )
      ) : (
        <ResultCard correctAnswers={points} />
      )}
    </div>
  );
};

export default Game;
