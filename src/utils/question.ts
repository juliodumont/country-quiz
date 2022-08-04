import { CountryInfo } from "Types";
import { regionListInfo } from "./request";

const QuestionSet = [
  { text: " is the capital of which country?", type: "capital", target: 'name'},
  { text: " is the currency of which country?", type: "currency", target: 'name' },
  { text: " `s official language is...", type: "language", target: 'languages' },
  { text: " is situated in which region?", type: "region", target: 'region' },
  { text: "Which country does this flag belong to?", type: "flag",  target: 'flag'},
];

type Answer = {
  id: string;
  text: string;
  type: boolean;
};

export type QuestionInfo = {
  question: string;
  additionalInfo: string | undefined;
  answers: Answer[];
};

export function getNewQuestion(): QuestionInfo {
  const questionInfo = {} as QuestionInfo;
  const subject = getSubject();
  const question = getQuestion();
  const answers = getAnswers(subject, question.target);
  question.type === "flag" ? question.text : subject.name + question.text;
  questionInfo.additionalInfo = question.type === "flag" ? subject.flag : "";
  return questionInfo;
}

function getQuestion() {
  return QuestionSet[randomIndex(QuestionSet.length)];
}

export function getSubject(): CountryInfo {
  const subjectRegion = regionListInfo[randomIndex(regionListInfo.length)];
  const subjectIndex = randomIndex(subjectRegion.regionCountries.length);
  const subject = subjectRegion.regionCountries[subjectIndex];
  return subject;
}

export function getAnswers(answer: CountryInfo, type: string): Answer[] {
  const questionID = ['A', 'B', 'C', 'D'];
  //const keys = Object.keys(answer) as Array<keyof typeof answer>;
  const questionSet = Array<Answer>();
  const wrongAnswersId = Array<string>();
  const correctAnswer = {
    id: questionID[randomIndex(questionID.length)],
    text: answer[type as keyof CountryInfo],
    type: true
  } as Answer
  questionID.forEach((id) => {
    if(id !== correctAnswer.id){
      wrongAnswersId.push(id);
    }
  })
  wrongAnswersId.forEach((id) => {
    const question = {
      id: id,
      text: getSubject()[type as keyof CountryInfo],
      type: false
    } as Answer
    questionSet.push(question)
  })
  questionSet.push(correctAnswer)

  console.log(questionSet)
  return questionSet;
}

function randomIndex(target: number): number {
  return Math.floor(Math.random() * target);
}
