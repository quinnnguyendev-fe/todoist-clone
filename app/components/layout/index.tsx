import { Outlet } from "react-router";
import { Sidebar } from "../sidebar";
import styles from "./style.module.scss";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <div className={styles["layout"]}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}
