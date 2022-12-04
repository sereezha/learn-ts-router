import * as rickmortyapi from "rickmortyapi";
import { CharacterFilter, Character } from "rickmortyapi/dist/interfaces";
import { getIdFromUrl } from "../helpers";
import { ICharacter } from "../types";

const createCharacter = ({
  id,
  image,
  name,
  species,
  status,
  gender,
  episode,
  origin,
}: Character): ICharacter => {
  const episodes = episode.map((item) => +getIdFromUrl(item));
  return {
    id,
    image,
    name,
    species,
    status,
    gender,
    episodes,
    origin: {
      url: origin.url,
    },
  };
};

const getCharacter = async (characterId: number) => {
  const { data } = await rickmortyapi.getCharacter(characterId);

  return createCharacter(data);
};

const getCharacters = async (
  filters?: Pick<CharacterFilter, "name" | "page">
) => {
  const res = await rickmortyapi.getCharacters(filters);
  const {
    data: { info, results },
  } = res;

  if (res.status === 404) {
    throw new Error("No such character");
  }

  const characters: ICharacter[] | undefined = results?.map((item) => {
    return createCharacter(item);
  });

  return { info, characters };
};

const getLocation = async (id: number) => {
  const {
    data: { name, type, dimension, residents },
  } = await rickmortyapi.getLocation(id);

  return {
    name,
    type,
    dimension,
    residentsAmount: residents.length,
  };
};

const getEpisodes = async (ids: number[]) => {
  const { data } = await rickmortyapi.getEpisode(ids);

  return Array.isArray(data) ? data : [data];
};

const requests = {
  getEpisodes,
  getCharacter,
  getCharacters,
  getLocation,
};

export default requests;
