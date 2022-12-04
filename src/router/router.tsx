import { createBrowserRouter, redirect } from "react-router-dom";
import { Character, Characters, ErrorPage } from "../routes";
import { getIdFromUrl } from "../helpers";
import { requests } from "../api";
import { routesMap } from "./helpers";

const { getCharacter, getLocation, getEpisodes } = requests;

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
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
      const [episodes, location] = await Promise.allSettled([
        getEpisodes(character.episodes),
        getLocation(+getIdFromUrl(character.origin.url)),
      ]);

      return { character, episodes, location };
    },
    errorElement: <ErrorPage />,
  },
]);

export default router;
