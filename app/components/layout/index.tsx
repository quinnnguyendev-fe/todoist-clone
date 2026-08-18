import { Outlet } from "react-router";
import { Sidebar } from "../sidebar";
import styles from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { selectTaskStatus } from "@/store/tasks/task.selector";
import { fetchTasks } from "@/store/tasks/task.slice";

export default function Layout() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectTaskStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  return (
    <div className={styles["layout"]}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
