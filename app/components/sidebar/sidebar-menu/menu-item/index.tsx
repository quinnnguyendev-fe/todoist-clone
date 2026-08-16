import type { ReactNode } from "react";
import styles from "./style.module.scss";

type MenuItemProps = {
  iconLeft: ReactNode;
  title: string;
  isActive?: boolean;
  suffixIcon?: ReactNode;
  count?: number;
  action: () => void;
  onClick: () => void;
};

export const MenuItem = ({
  iconLeft,
  title,
  isActive,
  suffixIcon,
  count,
  action,
  onClick
}: MenuItemProps) => {
  return (
    <div
      className={isActive ? `${styles["item"]} ${styles["active"]}` : styles["item"]} 
      onClick={() => {action?.(), onClick?.()}}
    >
      <div className={styles["item-wrapper"]}>
        <div className={styles["item-content"]}>
          {iconLeft}
          <span>{title}</span>
        </div>
        {!!count && <span className={styles["item-count"]}>{count}</span>}
      </div>
      {!!suffixIcon && (
        <button className={styles["item-suffix"]}>{suffixIcon}</button>
      )}
    </div>
  );
};
