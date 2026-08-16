import { useAppSelector } from "@/store/hooks";
import { selectTodayTasks } from "@/store/tasks/task.selector";
import { TaskBoard } from "../inbox/task-board";

export const TodayPage = () => {
  const tasks = useAppSelector(selectTodayTasks);
  return <>Kiểm thử today page</>
};
