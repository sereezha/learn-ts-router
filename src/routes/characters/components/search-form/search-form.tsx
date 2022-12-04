import { ChangeEvent, FormEvent } from "react";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import styles from "./search-form.module.scss";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchForm = (props: Props) => {
  const { value, onValueChange, onSubmit } = props;
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <label htmlFor="search-input">
        <b>Search by name</b>
      </label>
      <div className={styles.field}>
        <Input
          inputMode="search"
          placeholder="For example: rick"
          type="text"
          value={value}
          onChange={handleValueChange}
          id="search-input"
        />
        <Button>Search!</Button>
      </div>
    </form>
  );
};

export default SearchForm;
