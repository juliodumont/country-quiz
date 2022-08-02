import "./styles.css";

type QuestionAnswerType = {
  questionAnswer: string;
  questionNumber: string;
  setAnswerState?: string;
  onClick?: () => void;
};

export function QuestionAnswer(props: QuestionAnswerType) {
  const hasAnswered = (props.setAnswerState === 'wrong' ||props.setAnswerState === 'correct');
  return (
    <div className={`question-container answer-${props.setAnswerState}`}>
      <p>
        <span className="question-number" onClick={props.onClick}>
          {props.questionNumber}
        </span>
        {props.questionAnswer}
        {hasAnswered &&
          (props.setAnswerState === 'wrong' ? (
            <span className="material-icons answer-icon">cancel</span>
          ) : (
            <span className="material-icons answer-icon">check_circle</span>
          ))}
      </p>
    </div>
  );
}
