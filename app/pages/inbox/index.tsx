import { TaskBoard } from "./task-board";
import { useAppSelector } from "@/store/hooks";
import { selectAllTasks, selectTaskStatus } from "@/store/tasks/task.selector";
import { useSelector } from "react-redux";

export default function InboxPage() {
  const tasks = useAppSelector(selectAllTasks);
  const status = useSelector(selectTaskStatus);

  return (
    <>
      <TaskBoard tasks={tasks} status={status} />
    </>
  );
}
