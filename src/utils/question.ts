import { CountryInfo } from "Types";
import { Region} from "./request";

const QuestionSet = [
  {
    text: " is the capital of which country?",
    type: "capital",
    target: "name",
  },
  {
    text: " is the currency of which country?",
    type: "currency",
    target: "name",
  },
  {
    text: "'s official language is...",
    type: "name",
    target: "languages",
  },
  { text: " is situated in which region?", type: "name", target: "region" },
  {
    text: "Which country does this flag belong to?",
    type: "flag",
    target: "name",
  },
];

export type Answer = {
  id: string;
  text: string;
  type: boolean;
};

export type QuestionInfo = {
  question: string;
  additionalInfo: string | undefined;
  answers: Answer[];
};

export function getNewQuestion(regionSet: Region[]): QuestionInfo {
  const questionInfo = {} as QuestionInfo;
  const subject = getSubject(regionSet);
  const question = getQuestion();
  questionInfo.answers = getAnswers(subject, question.target, regionSet);
  questionInfo.question =
    question.type === "flag"
      ? question.text
      : subject[question.type as keyof typeof subject] +
        question.text;
  questionInfo.additionalInfo = question.type === "flag" ? subject.flag : "";
  return questionInfo;
}

function getQuestion() {
  return QuestionSet[randomIndex(QuestionSet.length)];
}

export function getSubject(regionSet: Region[]): CountryInfo {
  const subjectRegion = regionSet[randomIndex(regionSet.length)];
  const subjectIndex = randomIndex(subjectRegion?.regionCountries.length);
  const subject = subjectRegion.regionCountries[subjectIndex + 1];
  return subject;
}

export function getAnswers(answer: CountryInfo, type: string, regions: Region[]): Answer[] {
  const questionID = ["A", "B", "C", "D"];
  const questionSet = Array<Answer>();
  const wrongAnswersId = Array<string>();
  const correctAnswer = {
    id: questionID[randomIndex(questionID.length)],
    text: answer[type as keyof CountryInfo],
    type: true,
  } as Answer;
  questionID.forEach((id) => {
    if (id !== correctAnswer.id) {
      wrongAnswersId.push(id);
    }
  });
  wrongAnswersId.forEach((id) => {
    const question = {
      id: id,
      text: getSubject(regions)[type as keyof CountryInfo],
      type: false,
    } as Answer;
    questionSet.push(question);
  });
  questionSet.push(correctAnswer);
  questionSet.sort((a,b)=> a.id.charCodeAt(0) - b.id.charCodeAt(0));
  return questionSet;
}

function randomIndex(target: number): number {
  return Math.floor(Math.random() * target);
}
