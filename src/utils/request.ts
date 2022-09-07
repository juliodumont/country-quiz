import axios from "axios";
import { CountryApiType, CountryInfo } from "../Types";

const BASE_URL = "https://restcountries.com/v3.1/";

export type Region = {
  region: string;
  regionCountries: Array<CountryInfo>;
};

export function requestAPIInfo(
  set: React.Dispatch<React.SetStateAction<Region[]>>
) {
  const regions = [
    { region: "americas", regionCountries: [] as CountryInfo[] },
    { region: "europe", regionCountries: [] as CountryInfo[] },
    { region: "asia", regionCountries: [] as CountryInfo[] },
    { region: "africa", regionCountries: [] as CountryInfo[] },
    { region: "oceania", regionCountries: [] as CountryInfo[] },
  ] as Region[];

  axios
    .get(`https://restcountries.com/v3.1/all`)
    .then((response) => {
      response.data.forEach((country: CountryApiType) => {
        if (country.region != "Antarctic") {
          const countryInformation = getCurrentCountryInfo(country);
          regions.forEach((region) => {
            if (region.region === countryInformation.region) {
              region.regionCountries.push(countryInformation);
            }
          });
        }
      });
      set(regions);
    })
    .catch((error) => console.log(error));
}

function getCurrentCountryInfo(country: CountryApiType): CountryInfo {
  const currentCountry = {
    name: country.name.common ?? "",
    capital: country.capital?.at(0) ?? "",
    region: country.region.toLowerCase() ?? "",
    currency: Object.keys(country.currencies).toString() ?? "",
    flag: country.flags.svg ?? "",
    languages:
      Object.values(country.languages).length > 1
        ? Object.values(country.languages).slice(0, 2).join(", ")
        : Object.values(country.languages).join(", "),
  } as CountryInfo;
  return currentCountry;
}
