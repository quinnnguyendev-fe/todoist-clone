import styles from "./style.module.scss"

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

export const Spinner = ({ size = "md" }: SpinnerProps) => {
  return (
    <div
      className={styles[`spinner spinner-${size}`]}
      role="status"
      aria-label="Loading"
    />
  );
};
