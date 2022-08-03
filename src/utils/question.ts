const TextType = [
  "is the capital of which country?",
  "is the currency of which country?",
  "`s official language is...",
  "is situated in which region?",
];

const AddInfoType = ["Which country does this flag belong to?"];

const Questions = [TextType, AddInfoType];

export function getQuestion(): string[] {
  const questionTypeIndex = Math.floor(Math.random() * Questions.length);
  const questionSet = Questions[questionTypeIndex];
  const questionIndex = Math.floor(Math.random() * questionSet.length);
  return [questionSet[questionIndex], questionTypeIndex.toString()];
}





