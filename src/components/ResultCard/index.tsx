import { BaseCard } from "../../components/BaseCard";
import "./styles.css";

type Props = {
  correctAnswers: number;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function ResultCard(props: Props) {
  return (
    <BaseCard title={props.title} className="result-card">
      <div className="result-image">
        <img src="src/assets/images/undraw_winners.svg" alt="Winners" />
      </div>
      <div className="result-container">
        <h2>Results</h2>
        <p className="result">
          You got <span className="result-value">{props.correctAnswers}</span>{" "}
          correct answers
        </p>
      </div>
      <div className="result-button-container">
        <button className="try-again-button" onClick={props.onClick}>Try again</button>
      </div>
    </BaseCard>
  );
}
