import { useAppSelector } from "@/store/hooks";
import {
  selectTaskStatus,
  selectUpcomingTasks,
} from "@/store/tasks/task.selector";
import { TaskBoard } from "../inbox/task-board";

export const UpcomingPage = () => {
  const tasks = useAppSelector(selectUpcomingTasks);
  const status = useAppSelector(selectTaskStatus);

  console.log("Upcoming tasks:", tasks);
  console.log("Status:", status);

  return <TaskBoard tasks={tasks} status={status} />;
};

export default UpcomingPage;
