import { ResultCard } from "../../components/ResultCard";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useEffect, useState } from "react";
import { CountryInfo } from "../../Types";
import axios from "axios";
import { getAnswers, requestCountriesInfo } from "../../utils/question";

const testQuestionSet = [
  {
    id: "A",
    text: "Brazil",
  },
  {
    id: "B",
    text: "United States",
  },
  {
    id: "C",
    text: "Italy",
  },
  {
    id: "D",
    text: "Argentina",
  },
];

const Game = () => {
  const show = true;
  const [countryList, setCountryList] = useState<CountryInfo[]>();

  const [gameStatus, setGameStatus] = useState({ end: true });
  const [points, setPoints] = useState(0);//Acho que isso não é estado
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState([]);

  useEffect(() => {
    requestCountriesInfo(['europe']);
    getAnswers();
  }, []);

  return (
    <div className="game-container">
      {!gameStatus.end ? (
        <QuizCard
          title="Country quiz"
          answers={testQuestionSet}
          question={"Brasilia is the capital of which country?"}
          showButton={false}
        />
      ) : (
        <ResultCard correctAnswers={points} />
      )}
    </div>
  );
};

export default Game;
