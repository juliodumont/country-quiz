import { ResultCard } from "../../components/ResultCard";
import { QuizCard } from "../../components/QuizCard";
import "./styles.css";
import { useEffect, useState } from "react";
import { CountryInfo } from "../../Types";
import axios from "axios";

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
  const show = false;
  const [countryList, setCountryList] = useState<CountryInfo[]>();

  const [gameStatus, setGameStatus] = useState({ end: false });
  const [points, setPoints] = useState(0);//Acho que isso não é estado
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState([]);

  useEffect(() => {
    const countries: CountryInfo[] = [];
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        response.data.forEach((country: CountryInfo) => {
          const currentCountry = {
            name: country.name,
            languages: country.languages,
            flags: country.flags,
            capital: country.capital,
            region: country.region,
            currencies: country.currencies,
          } as CountryInfo;
          countries.push(currentCountry);
        });
      })
      .catch((error) => {
        console.log("Error");
      })
      .finally(() => {
        setCountryList(countries);
      });
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
