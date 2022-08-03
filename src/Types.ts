type CountryName = {
  common: string;
  official: string;
}

export type CountryInfo = {
  name: CountryName;
  currencies: {};
  capital: string[];
  region: string;
  flags: {};
  languages: {};
}