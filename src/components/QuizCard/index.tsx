import { BaseCard } from "../../components/BaseCard";
import { QuestionAnswer } from "./QuestionAnswer";
import "./styles.css";

type Props = {
  title: string;
  question: string;
  answers: {
    id: string;
    text: string;
  }[];
  additionalInfo?: React.ReactNode;
  showButton: boolean;
};

export function QuizCard(props: Props) {
  return (
    <BaseCard title={props.title} className="quiz-card">
      <div className="quiz-image">
        <img src="./src/assets/images/undraw_adventure.svg" alt="Adventure" />
      </div>
      <div className="additional-info">{props.additionalInfo}</div>
      <div className="quiz-question">
        <h2>{props.question}</h2>
      </div>
      {props.answers.map((answer) => {
        return (
          <QuestionAnswer
            questionAnswer={answer.text}
            questionNumber={answer.id}
            key={answer.id}
          />
        );
      })}
      {props.showButton && (
        <div className="button-container">
          <button>Next</button>
        </div>
      )}
    </BaseCard>
  );
}
