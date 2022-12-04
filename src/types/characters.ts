export interface IOrigin {
  url: string;
}

export interface ICharacterListItem {
  id: number;
  name: string;
  image: string;
}

export interface IEpisode {
  id: number;
  name: string;
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  episodes: number[];
  origin: IOrigin;
}

export interface ILocation {
  name: string;
  type: string;
  dimension: string;
  residentsAmount: number;
}
