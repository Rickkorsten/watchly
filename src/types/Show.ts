export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime?: number;
  premiered?: string;
  ended?: string;
  officialSite?: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average?: number;
  };
  weight: number;
  network: Network | null;
  webChannel: unknown;
  dvdCountry: unknown;
  externals: {
    tvrage?: number | null;
    thetvdb?: number | null;
    imdb?: string | null;
  };
  image?: Image;
  summary?: string;
  updated?: number;
  _links: {
    self: Link;
    previousepisode?: Link & { name?: string };
  };
}

export interface ShowDetails extends Show {
  _embedded?: {
    episodes?: Episode[];
    cast?: CastMember[];
  };
}

export interface SearchShow {
  score: number;
  show: Show;
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: {
    average?: number;
  };
  image?: Image;
  summary?: string;
  _links: {
    self: Link;
    show: Link & { name?: string };
  };
}

export interface CastMember {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}

export interface Person {
  id: number;
  url: string;
  name: string;
  birthday?: string;
  deathday?: string;
  gender?: string;
  country?: Country;
  image?: Image;
  updated?: number;
  _links: {
    self: Link;
  };
}

export interface Character {
  id: number;
  url: string;
  name: string;
  image?: Image;
  _links: {
    self: Link;
  };
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite?: string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Link {
  href: string;
}
