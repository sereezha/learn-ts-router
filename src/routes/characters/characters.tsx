import { useEffect, useState } from "react";
import { requests } from "../../api";
import { useSearchParams } from "react-router-dom";
import { CharactersList, Layout, Pagination } from "../../components";
import { getUrlParam } from "../../helpers";
import styles from "./characters.module.scss";
import { SearchForm } from "./components";
import { ICharacter } from "../../types";

const { getCharacters } = requests;

const INITIAL_PAGE = 1;

const Characters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [value, setValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagesAmount, setPagesAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllCharacters = async () => {
      try {
        const page = getUrlParam(searchParams, "page");
        const { characters: chars, info } = await getCharacters({
          name: getUrlParam(searchParams, "name") || "",
          page: page ? +page : INITIAL_PAGE,
        });

        setCharacters(chars ?? []);
        setPagesAmount(info!.pages);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllCharacters();
  }, [searchParams]);

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  const handleFormSubmit = () => {
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

  const searchParamPage = getUrlParam(searchParams, "page");
  const page = searchParamPage ? +searchParamPage : INITIAL_PAGE;

  return (
    <Layout>
      <div className={styles.main}>
        <SearchForm
          value={value}
          onSubmit={handleFormSubmit}
          onValueChange={handleValueChange}
        />
        {!!characters.length && <CharactersList characters={characters} />}
        {pagesAmount && (
          <Pagination
            forcePage={page}
            initialPage={page}
            onPageChange={handlePageClick}
            pagesAmount={pagesAmount}
          />
        )}
      </div>
    </Layout>
  );
};

export default Characters;
