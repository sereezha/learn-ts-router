import { useState } from "react";
import { ErrorMessage, Layout, Pagination } from "../../components";
import { getUrlParam } from "../../helpers";
import { Status } from "../../types";
import styles from "./characters.module.scss";
import { SearchForm, CharactersList } from "./components";
import useCharacters from "./use-characters";

const INITIAL_PAGE = 1;

const Characters = () => {
  const [value, setValue] = useState<string>("");
  const {
    characters,
    status,
    errorMessage,
    handleFormSubmit,
    handlePageClick,
    pagesAmount,
    searchParams,
  } = useCharacters();

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  const page = getUrlParam(searchParams, "page");

  return (
    <Layout>
      <div className={styles.main}>
        <h1>Rick and Morty wiki!</h1>
        <SearchForm
          value={value}
          onSubmit={() => handleFormSubmit(value)}
          onValueChange={handleValueChange}
        />
        {status !== Status.ERROR && (
          <CharactersList
            isLoading={status === Status.LOADING}
            characters={characters}
          />
        )}
        {!!characters.length && status === Status.IDLE && (
          <>
            <Pagination
              forcePage={page ? +page : INITIAL_PAGE}
              onPageChange={handlePageClick}
              pagesAmount={pagesAmount}
            />
          </>
        )}
        {status === Status.ERROR && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    </Layout>
  );
};

export default Characters;
