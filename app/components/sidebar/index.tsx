import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";
import { SidebarMenu } from "./sidebar-menu";
import styles from "./style.module.scss";

export const Sidebar = () => {
  return (
    <nav className={styles["sidebar"]}>
      <SidebarHeader />
      <SidebarMenu />
      <SidebarFooter />
    </nav>
  );
};
