import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={styles.button} />;
};

export default Button;
