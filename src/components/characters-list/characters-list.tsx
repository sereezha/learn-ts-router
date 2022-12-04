import { Link } from "react-router-dom";
import { routesMap } from "../../router";
import { ICharacterListItem } from "../../types";
import styles from "./characters-list.module.scss";

interface Props {
  characters: ICharacterListItem[];
}

const CharactersList = ({ characters }: Props) => (
  <div className={styles.charactersList}>
    {characters.map(({ id, image, name }) => (
      <div className={styles.characterItem} key={id}>
        <img src={image} alt="" width="300" height="300" />
        <p>{name}</p>
        <Link to={`${routesMap.character.url}/${id}`}>Read more</Link>
      </div>
    ))}
  </div>
);

export default CharactersList;
