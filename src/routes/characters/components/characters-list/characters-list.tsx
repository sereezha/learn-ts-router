import { Link } from "react-router-dom";
import { Skeleton } from "../../../../components";
import { routesMap } from "../../../../router";
import { ICharacterListItem } from "../../../../types";
import styles from "./characters-list.module.scss";

interface Props {
  characters: ICharacterListItem[];
  isLoading?: boolean;
}

const dummyCharacters: ICharacterListItem[] = Array.from({ length: 4 }).map(
  (_, i) => ({
    id: i,
    image: "",
    name: "",
    url: "",
  })
);

const IMAGE_DIMENSIONS = {
  width: 278,
  height: 278,
};

const CharactersList = ({ characters, isLoading = false }: Props) => {
  const chars = isLoading ? dummyCharacters : characters;
  return (
    <div className={styles.charactersList}>
      {chars.map(({ id, image, name }) => (
        <div className={styles.characterItem} key={id}>
          {isLoading ? (
            <Skeleton
              style={{
                width: IMAGE_DIMENSIONS.width,
                height: IMAGE_DIMENSIONS.height,
              }}
            />
          ) : (
            <img
              src={image}
              alt=""
              width={IMAGE_DIMENSIONS.width}
              height={IMAGE_DIMENSIONS.height}
            />
          )}
          {isLoading ? <Skeleton /> : <p>{name}</p>}
          {isLoading ? (
            <Skeleton />
          ) : (
            <Link to={`${routesMap.character.url}/${id}`}>Read more</Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default CharactersList;
