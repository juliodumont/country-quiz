import axios from "axios";
import { CountryApiType, CountryInfo } from "Types";

const BASE_URL = "https://restcountries.com/v3.1/";

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

export function getSubject(): string {
  return "";
}

export function getAnswers(): string[] {
  return [];
}

type Region = {
  region: string;
  regionCountries: CountryApiType[];
};

export function requestCountriesInfo(regions: string[]) {
  const countriesList = [] as Region[];
  regions.map((region) => {
    const regionInfo = {
      region: region,
      regionCountries:
        region == "all"
          ? requestAPIInfo(`/${region}`)
          : requestAPIInfo(`/region/${region}`),
    } as Region;
    countriesList.push(regionInfo);
  });
  return countriesList;
}

function requestAPIInfo(target: string): CountryApiType[] {
  const countriesList: CountryApiType[] = [];
  axios
    .get(`${BASE_URL}${target}`)
    .then((response) => {
      response.data.forEach((country: CountryApiType) => {
        const currentCountry = {
          name: country.name,
          languages: country.languages,
          flags: country.flags,
          capital: country.capital,
          region: country.region,
          currencies: country.currencies,
        } as CountryApiType;
        countriesList.push(currentCountry);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return countriesList;
}

function PrettierCountryInfo(info: CountryApiType): CountryInfo {
  const prettierCountry = {
    name: info.name.common,
    capital: info.capital[0],
    region: info.region,
    flag: info.flags.svg,
    language: info.languages.valueOf(),
    currencies: info.currencies.valueOf(),
  } as CountryInfo;

  console.log(prettierCountry.currencies, prettierCountry.language);
  return prettierCountry;
}
