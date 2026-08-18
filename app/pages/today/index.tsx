import { useAppSelector } from "@/store/hooks";
import {
  selectTaskStatus,
  selectTodayTasks,
} from "@/store/tasks/task.selector";
import { TaskBoard } from "../inbox/task-board";

export const TodayPage = () => {
  const tasks = useAppSelector(selectTodayTasks);
  const status = useAppSelector(selectTaskStatus);

  return <TaskBoard tasks={tasks} status={status} />;
};

export default TodayPage;
