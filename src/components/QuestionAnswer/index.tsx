import "./styles.css";

type QuestionAnswerType = {
  questionAnswer: string;
  questionNumber: string;
};

export function QuestionAnswer(props: QuestionAnswerType) {
  return (
    <div className="question-container">
      <p>
        <span className="question-number">{props.questionNumber}</span>
        {props.questionAnswer}
      </p>
    </div>
  );
}
