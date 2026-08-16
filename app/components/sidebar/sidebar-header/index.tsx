import styles from "./style.module.scss";
import { BellIC } from "@/components/icons/bell-ic.icon";
import { ToggleIC } from "@/components/icons/toggle-ic.icon";
import { UserMenu } from "@/components/common/user-menu";

export const SidebarHeader = () => {

  return (
    <div className={styles["header"]}>
      <UserMenu/>

      <div className={styles["header-actions"]}>
        <button onClick={() => {}} title="">
          <BellIC />
        </button>
        <button>
          <ToggleIC />
        </button>
      </div>
    </div>
  );
};
