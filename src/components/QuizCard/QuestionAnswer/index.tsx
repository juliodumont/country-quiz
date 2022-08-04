import "./styles.css";

type QuestionAnswerType = {
  questionAnswer: string;
  questionNumber: string;
  setAnswerState?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const handleClick = () => {
  return null;
}

export function QuestionAnswer(props: QuestionAnswerType) {
  const hasAnswered = ['true', 'false', 'disabled'].includes(props.setAnswerState)
  return (
    <button className={`question-container answer-${props.setAnswerState}`} onClick={!hasAnswered ? props.onClick : handleClick}>
      <p>
        <span className="question-number">
          {props.questionNumber}
        </span>
        {props.questionAnswer}
        {(props.setAnswerState === 'false' ||   props.setAnswerState === 'true') &&
          (props.setAnswerState === 'false' ? (
            <span className="material-icons answer-icon">cancel</span>
          ) : (
            <span className="material-icons answer-icon">check_circle</span>
          ))}
      </p>
    </button>
  );
}
