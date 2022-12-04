import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { requests } from "../../api";
import { getErrorMessage, getUrlParam } from "../../helpers";
import { ICharacter } from "../../types";

const { getCharacters } = requests;

enum Action {
  FETCHING = "FETCHING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

type IAction =
  | { type: Action.FETCHING }
  | {
      type: Action.SUCCESS;
      payload: {
        characters: ICharacter[];
        pagesAmount: number;
      };
    }
  | {
      type: Action.ERROR;
      payload: {
        errorMessage: string;
      };
    };

interface IState {
  characters: ICharacter[];
  status: Status;
  pagesAmount: number;
  errorMessage: string;
}

const initialState: IState = {
  characters: [],
  status: Status.IDLE,
  pagesAmount: 0,
  errorMessage: "",
};

const INITIAL_PAGE = 1;

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case Action.FETCHING:
      return { ...state, status: Status.LOADING, characters: [] };
    case Action.SUCCESS:
      return {
        ...state,
        status: Status.IDLE,
        characters: action.payload.characters,
        pagesAmount: action.payload.pagesAmount,
        errorMessage: "",
      };
    case Action.ERROR:
      return {
        ...state,
        status: Status.ERROR,
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
      dispatch({ type: Action.FETCHING });
      try {
        const page = getUrlParam(searchParams, "page");
        const { characters: chars, info } = await getCharacters({
          name: getUrlParam(searchParams, "name") || "",
          page: page ? +page : INITIAL_PAGE,
        });

        dispatch({
          type: Action.SUCCESS,
          payload: {
            characters: chars!,
            pagesAmount: info!.pages,
          },
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: Action.ERROR,
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
