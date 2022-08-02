import "./styles.css";

type Props = {
  correctAnswers: number;
};

export function ResultCard(props: Props) {
  return (
    <>
      <div className="quiz-title-container">
        <h1>Country quiz</h1>
      </div>
      <div className="result-base-card">
        <div className="quiz-image">
          <img src="src/assets/images/undraw_winners.svg" alt="" />
        </div>
        <div className="result-container">
          <h2>Results</h2>
          <p className="result">
            You got <span className="result-value">{props.correctAnswers}</span>{" "}
            correct answers
          </p>
        </div>
        <div className="result-button-container">
            <button className="try-again-button">Try again</button>
        </div>
      </div>
    </>
  );
}
