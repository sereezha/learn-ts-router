import { useState } from "react";
import Button from "../../../components/button";
import { IEpisode } from "../../../types";
import styles from "../character.module.scss";

interface Props {
  episodes: IEpisode[];
}

const Episodes = ({ episodes }: Props) => {
  const [showEpisodes, setShowEpisodes] = useState(false);

  const handleEpisodesVisibility = () => {
    setShowEpisodes((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={handleEpisodesVisibility}>
        {showEpisodes ? "Hide" : "Show"} Episodes
      </Button>
      {showEpisodes && (
        <ul role="list" className={styles.episodesList}>
          {episodes.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Episodes;
