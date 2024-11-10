export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  area: number;
  maps?: {
    googleMaps: string;
  };
}

export interface CountriesPageQuery {
  allCountries: {
    nodes: Country[];
  };
}
