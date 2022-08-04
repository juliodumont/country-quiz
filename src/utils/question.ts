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
  regionCountries: Array<CountryInfo>;
};

const countryListInfo = [] as Region[];

function requestAPIInfo(target: string): CountryInfo[] {
  const countriesList: CountryInfo[] = [];
  axios
    .get(`${BASE_URL}${target}`)
    .then((response) => {
      response.data.forEach((country: CountryApiType) => {
        const currentCountry = {
          name: country.name.common,
          capital: country.capital?.at(0) ?? '',
          region: country.region ?? '',
          currency: Object.keys(country.currencies).toString() ?? '',
          flag: country.flags.svg ?? '',
          languages: Object.values(country.languages) ?? ''
        } as CountryInfo;
        countriesList.push(currentCountry);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return countriesList;
}

export function requestCountriesInfo(regions: string[]) : Region[] {
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