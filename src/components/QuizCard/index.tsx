import React, { useState } from "react";
import "./styles.css";

type Props = {
  children?: React.ReactNode;
  question: string;
  additionalInfo?: React.ReactNode;
};

export function QuizCard(props: Props) {

  const [answered, setAnswered] = useState(false);

  return (
    <React.Fragment>
      <div className="quiz-title-container">
        <h1>Country quiz</h1>
      </div>
      <div className="quiz-base-card">
        <div className="quiz-image">
          <img src="./src/assets/images/undraw_adventure.svg" alt="" />
        </div>
        <div className="additional-info">{props.additionalInfo}</div>
        <div className="quiz-question">
          <h2>{props.question}</h2>
        </div>
        {props.children}
      </div>
    </React.Fragment>
  );
}
