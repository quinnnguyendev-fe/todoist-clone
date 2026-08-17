import type { ReactNode } from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router";

type MenuItemProps = {
  iconLeft: ReactNode;
  title: string;
  suffixIcon?: ReactNode;
  count?: number;
  action?: () => void;
  onClick?: () => void;
  to?: string;
};

export const MenuItem = ({
  iconLeft,
  title,
  suffixIcon,
  count,
  action,
  onClick,
  to,
}: MenuItemProps) => {
  const content = (
    <div className={styles["item-wrapper"]}>
      <div className={styles["item-content"]}>
        {iconLeft && iconLeft}
        <span>{title}</span>
      </div>
      {!!count && <span className={styles["item-count"]}>{count}</span>}
    </div>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${styles["item"]} ${styles["active"]}` : styles["item"]
        }
        onClick={onClick}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <div
      className={styles["item"]}
      onClick={() => {
        (action?.(), onClick?.());
      }}
    >
      {content}
      {!!suffixIcon && (
        <button className={styles["item-suffix"]}>{suffixIcon}</button>
      )}
    </div>
  );
};
