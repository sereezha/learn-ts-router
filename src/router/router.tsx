import { createBrowserRouter, redirect } from "react-router-dom";
import ErrorPage from "../error-page";
import { Character, Characters } from "../routes";
import { getIdFromUrl } from "../helpers";
import { requests } from "../api";
import { routesMap } from "./helpers";

const { getCharacter, getLocation, getEpisodes } = requests;

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return redirect(routesMap.characters.url);
    },
  },
  {
    path: routesMap.characters.url,
    element: <Characters />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${routesMap.character.url}/:characterId`,
    element: <Character />,
    loader: async ({ params: { characterId } }) => {
      const character = await getCharacter(+characterId!);
      const episodes = await getEpisodes(character.episodes);
      const location = await getLocation(+getIdFromUrl(character.origin.url));

      return { character, episodes, location };
    },
    errorElement: <ErrorPage />,
  },
]);

export default router;
