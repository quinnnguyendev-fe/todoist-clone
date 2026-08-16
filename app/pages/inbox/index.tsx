import { todoApi } from "@/api";
import { TaskBoard } from "./task-board";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTasks } from "@/store/tasks/task.slice";
import { selectAllTasks } from "@/store/tasks/task.selector";

export default function InboxPage() {

  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectAllTasks)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskList = await todoApi.getList()

        dispatch(setTasks(taskList))
      } catch(error) {
        console.error(error)
      }
    }

    loadTasks()
  }, [dispatch]);

  return (
    <>
      <TaskBoard tasks={tasks} />
    </>
  );
}
