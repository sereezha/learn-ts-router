import styles from "./error-message.module.scss";

interface Props {
  children: string;
}

const ErrorMessage = ({ children }: Props) => {
  return <p className={styles.message}>{children}</p>;
};

export default ErrorMessage;
