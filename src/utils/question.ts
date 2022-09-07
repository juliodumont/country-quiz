import { CountryInfo } from "../Types";
import { Region } from "./request";

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
    text: "'s official languages:",
    type: "name",
    target: "languages",
  },
  {
    text: "Which country does this flag belong to?",
    type: "flag",
    target: "name",
  },
  { text: " is situated in which region?", type: "name", target: "region" },
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
  const question = getQuestion(regionSet.length > 2 ? true : false);
  questionInfo.answers = getAnswers(subject, question.target, regionSet);
  questionInfo.question =
    question.type === "flag"
      ? question.text
      : subject[question.type as keyof typeof subject] + question.text;
  questionInfo.additionalInfo = question.type === "flag" ? subject.flag : "";
  return questionInfo;
}

function getQuestion(includeRegion: boolean) {
  return includeRegion
    ? QuestionSet[randomIndex(QuestionSet.length)]
    : QuestionSet[randomIndex(QuestionSet.length - 1)];
}

export function getSubject(regionSet: Region[]): CountryInfo {
  const subjectRegion = regionSet[randomIndex(regionSet.length)];
  const subjectIndex = randomIndex(subjectRegion?.regionCountries.length);
  const subject = subjectRegion.regionCountries[subjectIndex];
  return subject;
}

export function getAnswers(
  answer: CountryInfo,
  type: string,
  regions: Region[]
): Answer[] {
  const questionID = ["A", "B", "C", "D"];
  const answerSet = Array<Answer>();
  const wrongAnswersId = Array<string>();
  const currentSet = [] as string[];
  const correctAnswer = {
    id: questionID[randomIndex(questionID.length)],
    text: answer[type as keyof CountryInfo],
    type: true,
  } as Answer;
  currentSet.push(correctAnswer.text);
  questionID.forEach((id) => {
    if (id !== correctAnswer.id) {
      wrongAnswersId.push(id);
    }
  });

  do {
    const question = {
      id: wrongAnswersId[0],
      text: getSubject(regions)[type as keyof CountryInfo],
      type: false,
    } as Answer;

    if (type == "region" && regions.length < 4) {
      const regions = ["americas", "europe", "asia", "africa", "oceania"];
      question.text = regions[randomIndex(regions.length)];
    }

    if (!currentSet.includes(question.text)) {
      currentSet.push(question.text);
      answerSet.push(question);
      wrongAnswersId.shift();
    }
  } while (wrongAnswersId.length);
  answerSet.push(correctAnswer);
  answerSet.sort((a, b) => a.id.charCodeAt(0) - b.id.charCodeAt(0));
  if (type == "region") {
    answerSet.forEach((answer) => {
      answer.text = answer.text[0].toUpperCase() + answer.text.substring(1);
    });
  }
  return answerSet;
}

function randomIndex(target: number): number {
  return Math.floor(Math.random() * target);
}
