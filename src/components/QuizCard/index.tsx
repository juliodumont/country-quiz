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
  onAnswerClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  questionStatus: string[];
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
      {props.answers && props.answers.map((answer, id) => {
        return (
          <QuestionAnswer
            questionAnswer={answer.text}
            questionNumber={answer.id}
            key={answer.id}
            onClick={props.onAnswerClick}
            setAnswerState={props.questionStatus[id]}
          />
        );
      })}
      {props.showButton && (
        <div className="base-button-sm">
          <button onClick={props.onClick}>Next</button>
        </div>
      )}
    </BaseCard>
  );
}
