import { useLoaderData, useNavigate } from "react-router-dom";
import { Layout } from "../../components";
import Button from "../../components/button";
import { ICharacter, IEpisode, ILocation } from "../../types";
import styles from "./character.module.scss";
import { Episodes, Location } from "./components";

interface ILoaderData {
  character: ICharacter;
  episodes: IEpisode[];
  location: ILocation;
}

const Character = () => {
  const { character, episodes, location } =
    useLoaderData() as unknown as ILoaderData;
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <Layout>
      <div className={styles.main}>
        <Button onClick={handleBackClick}>Go back</Button>
        {!!character && (
          <div className={styles.character}>
            <img src={character.image} alt="" />
            <div className={styles.info}>
              <p>
                <b>Name:</b> {character.name}
              </p>
              <p>
                <b>Gender: </b>
                {character.gender}
              </p>
              <p>
                <b>Species: </b>
                {character.species}
              </p>
              <p>
                <b>Status: </b>
                {character.status}
              </p>
              {!!location && <Location location={location} />}
              {!!episodes.length && <Episodes episodes={episodes} />}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Character;
