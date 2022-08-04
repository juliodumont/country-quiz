
export type CountryApiType = {
  name: {
    common: string;
    official: string;
  };
  capital: string[] | undefined;
  region: string;
  flags: {
    png: string;
    svg: string;
  };
  currencies: Object;
  languages: Object;
}

export type CountryInfo = {
  name: string | undefined;
  currencies: string | undefined;
  capital: string | undefined;
  region: string | undefined;
  flag: string | undefined;
  language: string | undefined;
}