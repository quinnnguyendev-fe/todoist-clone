import type { CSSProperties, ReactNode } from "react";
import styles from './style.module.scss'

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "transparent";
  title: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button = ({
  variant = "primary",
  title,
  iconLeft,
  iconRight,
  style,
  disabled,
  isLoading,
  onClick,
}: ButtonProps) => {

  return (
    <>
      <button className={`${styles["button"]} ${styles[`button-${variant}`]}`} disabled={disabled} style={style} onClick={onClick}>
        {iconLeft && iconLeft}
        <span>{title}</span>
        {iconRight && iconRight}
        {isLoading && isLoading}
      </button>
    </>
  );
};
