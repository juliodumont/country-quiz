import { ResultCard } from "../../components/ResultCard";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useEffect, useState } from "react";
import { Answer, getNewQuestion, QuestionInfo } from "../../utils/question";
import { Region, requestAPIInfo } from "../../utils/request";
import { StartCard } from "../../components/StartCard";

const Game = () => {
  const [countryList, setCountryList] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<QuestionInfo>({
    question: "",
    additionalInfo: "",
    answers: [] as Answer[],
  });
  const [points, setPoints] = useState(0);
  const [next, setNext] = useState(false);

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

  useEffect(() => {
    if (!countryList.length) {
      requestAPIInfo(setCountryList);
    }else{
      setIsLoading(false);
    }
  }, [countryList]);

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
    if(countryList){
      setGameStatus({ ...gameStatus, start: false });
      setQuestion(getNewQuestion(countryList));
    }
  };

  const handleAnswerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const answer = target.textContent?.slice(1);
    const questionStatus = [] as string[];
    const questionSetAnswers = question?.answers;
    questionSetAnswers?.forEach((question) => {
      if (question.type == false && question.text != answer) {
        questionStatus.push("disabled");
      } else if (question.type == true) {
        questionStatus.push("true");
        if (question.text == answer) {
          setPoints((prev) => prev + 1);
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
      setQuestion(getNewQuestion(countryList));
      setCurrentQuestionStatus(["unset", "unset", "unset", "unset"]);
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
            onSelect={handleRegionSelectClick}
            userMessage="Select regions:"
            active={activeRegions}
            options={["Americas", "Europe", "Asia", "Africa", "Oceania"]}
            isLoading={isLoading}
          />
        ) : (
          <QuizCard
            title="Country quiz"
            answers={question?.answers}
            question={question?.question}
            showButton={next}
            onAnswerClick={handleAnswerClick}
            onClick={handleNextClick}
            questionStatus={currentQuestionStatus}
            additionalInfo={question.additionalInfo}
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
