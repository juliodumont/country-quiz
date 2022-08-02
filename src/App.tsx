import { QuestionAnswer } from "./components/QuestionAnswer";
import { QuizCard } from "./components/QuizCard";
import "./App.css";
import { SimpleButton } from "./components/SimpleButton";
import { useState } from "react";

function App() {
  const [answered, setAnswered] = useState(false);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  }

  return (
    <main className="App">
      <QuizCard
        question="Kuala Lumpur is the capital of"
        additionalInfo={<h1>Add info</h1>}
      >
          <button onClick={}></button>
        <QuestionAnswer questionAnswer="Vietnam" questionNumber="A" />
        <QuestionAnswer questionAnswer="Malaysia" questionNumber="B" />
        <QuestionAnswer questionAnswer="Sweden" questionNumber="C" />
        <QuestionAnswer questionAnswer="Austria" questionNumber="D" />

        <SimpleButton
          color="#FFF"
          border="none"
          padding="15px 36px"
          bgColor="#F9A826"
          radius="12px"
        >
          Next
        </SimpleButton>
      </QuizCard>
    </main>
  );
}

export default App;
