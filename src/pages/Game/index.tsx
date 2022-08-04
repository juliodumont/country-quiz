import { ResultCard } from "../../components/ResultCard";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useEffect, useState } from "react";
import { CountryInfo } from "../../Types";
import axios from "axios";
import { getAnswers, getNewQuestion } from "../../utils/question";
import { Region, requestCountriesInfo } from "../../utils/request";
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
  const [countryList, setCountryList] = useState<Region[]>();
  const [question, setQuestion] = useState();
  const [gameStatus, setGameStatus] = useState({
    start: true,
    end: false,
    results: false,
  });

  const [activeRegions, setActiveRegions] = useState({
    americas: false,
    europe: false,
    asia: false,
    africa: false,
    oceania: false,
  });

  const [points, setPoints] = useState(0);
  const [next, setNext] = useState(false);
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState<string[]>([
    "unset",
    "unset",
    "unset",
    "unset",
  ]);

  const handleRegionSelectClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const target = event.currentTarget.textContent?.toLowerCase();
    if (target !== undefined) {
      const updatedRegion =
        !activeRegions[target as keyof typeof activeRegions];
      setActiveRegions({ ...activeRegions, [target]: updatedRegion });
    }
  };

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const regions = Object.keys(activeRegions).filter((key) => {
      if (!activeRegions[key as keyof typeof activeRegions]) {
        return key;
      }
    });
    setCountryList(requestCountriesInfo(regions));
    setGameStatus({ ...gameStatus, start: false });
  };

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(countryList);
    event.preventDefault();
    const target = event.currentTarget;
    const answer = target.textContent?.slice(1);
    const questionStatus = [] as string[];
    testQuestionSet.forEach((question) => {
      if (question.type == false && question.text != answer) {
        questionStatus.push("disabled");
      } else if (question.type == true) {
        questionStatus.push("true");
        if (question.text == answer) {
          setPoints(points + 1);
        }
      } else if (question.type == false && question.text == answer) {
        questionStatus.push("false");
        setGameStatus({ ...gameStatus, end: true });
      }
    });
    setNext(true);
    setCurrentQuestionStatus(questionStatus);
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (gameStatus.end) {
      setGameStatus({ ...gameStatus, results: true });
    } else if (!gameStatus.end) {
      /*teste*/
      setGameStatus({ ...gameStatus, results: true });
    }
  };

  const handleTryAgainClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPoints(0);
    setGameStatus({ start: true, end: false, results: false });
    setCurrentQuestionStatus(["unset", "unset", "unset", "unset"]);
  };

  return (
    <div className="game-container">
      {!gameStatus.results ? (
        gameStatus.start ? (
          <StartCard
            title="Country quiz"
            onClick={handleStartClick}
            onRegionSelect={handleRegionSelectClick}
            userMessage="Select regions:"
            active={activeRegions}
          />
        ) : (
          <QuizCard
            title="Country quiz"
            answers={testQuestionSet}
            question={"Brasilia is the capital of which country?"}
            showButton={next}
            onAnswerClick={handleAnswerClick}
            onClick={handleNextClick}
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
