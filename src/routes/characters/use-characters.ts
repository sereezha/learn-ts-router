import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { requests } from "../../api";
import { getErrorMessage, getUrlParam } from "../../helpers";
import { ICharacter } from "../../types";

const { getCharacters } = requests;

interface State {
  characters: ICharacter[];
  status: "idle" | "loading" | "error";
  pagesAmount: number;
  errorMessage: string;
}

type Action =
  | { type: "fetching" }
  | {
      type: "success";
      payload: {
        characters: ICharacter[];
        pagesAmount: number;
      };
    }
  | {
      type: "error";
      payload: {
        errorMessage: string;
      };
    };

const initialState: State = {
  characters: [],
  status: "idle",
  pagesAmount: 0,
  errorMessage: "",
};

const INITIAL_PAGE = 1;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "fetching":
      return { ...state, status: "loading", characters: [] };
    case "success":
      return {
        ...state,
        status: "idle",
        characters: action.payload.characters,
        pagesAmount: action.payload.pagesAmount,
        errorMessage: "",
      };
    case "error":
      return {
        ...state,
        status: "error",
        characters: [],
        errorMessage: action.payload.errorMessage,
      };
    default:
      throw new Error();
  }
};

const useCharacters = () => {
  const [{ characters, status, errorMessage, pagesAmount }, dispatch] =
    useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCharacters = async () => {
      dispatch({ type: "fetching" });
      try {
        const page = getUrlParam(searchParams, "page");
        const { characters: chars, info } = await getCharacters({
          name: getUrlParam(searchParams, "name") || "",
          page: page ? +page : INITIAL_PAGE,
        });

        dispatch({
          type: "success",
          payload: {
            characters: chars!,
            pagesAmount: info!.pages,
          },
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: "error",
          payload: { errorMessage: getErrorMessage(error) },
        });
      }
    };

    fetchCharacters();
  }, [searchParams]);

  const handleFormSubmit = (value: string) => {
    setSearchParams({
      page: INITIAL_PAGE.toString(),
      ...(value && {
        name: value,
      }),
    });
  };

  const handlePageClick = (selectedPage: string) => {
    const name = getUrlParam(searchParams, "name");
    setSearchParams({
      page: selectedPage,
      ...(name && {
        name,
      }),
    });
  };

  return {
    characters,
    status,
    errorMessage,
    pagesAmount,
    searchParams,
    handleFormSubmit,
    handlePageClick,
  };
};

export default useCharacters;
