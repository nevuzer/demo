import styles from "./Loader.module.css";

export const Loader = (props) => {
  const { message } = props;
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <div>{message}</div>
    </div>
  );
};
