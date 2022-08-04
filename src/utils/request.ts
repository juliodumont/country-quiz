import axios from "axios";
import { CountryApiType, CountryInfo } from "Types";

const BASE_URL = "https://restcountries.com/v3.1/";

export type Region = {
  region: string;
  regionCountries: Array<CountryInfo>;
};

export const regionListInfo = Array<Region>();

function requestAPIInfo(target: string): CountryInfo[] {
  const countriesList: CountryInfo[] = [];
  axios
    .get(`${BASE_URL}${target}`)
    .then((response) => {
      response.data.forEach((country: CountryApiType) => {
        const currentCountry = {
          name: country.name.common,
          capital: country.capital?.at(0) ?? "",
          region: country.region ?? "",
          currency: Object.keys(country.currencies).toString() ?? "",
          flag: country.flags.svg ?? "",
          languages: Object.values(country.languages) ?? "",
        } as CountryInfo;
        countriesList.push(currentCountry);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return countriesList;
}

export function requestCountriesInfo(regions: string[]): Region[] {
  regions.forEach((region) => {
    if (!getCurrentStoredRegions().includes(region)) {
      const regionInfo = {
        region: region,
        regionCountries:
          region == "all"
            ? requestAPIInfo(`/${region}`)
            : requestAPIInfo(`/region/${region}`),
      } as Region;
      regionListInfo.push(regionInfo);
    }
  });
  return regionListInfo;
}

function getCurrentStoredRegions(): string[] {
  const regions = Array<string>();
  regionListInfo.forEach((regionInfo) => regions.push(regionInfo.region));
  return regions;
}
