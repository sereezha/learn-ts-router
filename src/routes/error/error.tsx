import { useRouteError } from "react-router-dom";
import styles from "./error.module.scss";

interface IError {
  status: number;
  statusText: string;
  data: string;
}

const ErrorPage = () => {
  const error = useRouteError() as unknown as IError;
  console.error(error);

  return (
    <div className={styles.error} id="error-page">
      <p className={styles.errorStatus}>
        {error.status} - {error.statusText}
      </p>
      <h1 className={styles.errorText}>Oops! {error.data}</h1>
    </div>
  );
};

export default ErrorPage;
