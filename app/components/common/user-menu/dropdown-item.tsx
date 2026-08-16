import styles from "./style.module.scss";
import type { DropdownItemType } from "./type";

type DropdownItemProps = {
  item: DropdownItemType;
  onClose?: () => void;
};

export const DropdownItem = ({ item, onClose }: DropdownItemProps) => {
  const handleClick = () => {
    if (item.disabled) return;

    item.onClick?.();
    onClose?.();
  };

  return (
    <button
      className={styles["item"]}
      onClick={handleClick}
      disabled={item.disabled}
    >
      <div className={styles["item-group"]}>
        {item.leftIcon && (
          <div className={styles["item-icon"]}>{item.leftIcon}</div>
        )}
        {item.label && (
          <div className={styles["item-label"]}>
            <span>{item.label}</span>
            {item.subLabel && <p>{item.subLabel}</p>}
          </div>
        )}
      </div>
      {item.rightIcon && (
        <div className={styles["item-icon"]}>{item.rightIcon}</div>
      )}
      {item.shortcut && (
        <div className={styles["item-shortcuts"]}>{item.shortcut}</div>
      )}
    </button>
  );
};
