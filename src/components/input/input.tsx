import { InputHTMLAttributes } from "react";
import styles from "./input.module.scss";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={styles.input} />;
};

export default Input;
