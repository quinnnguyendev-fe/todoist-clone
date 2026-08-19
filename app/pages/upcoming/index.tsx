import { useAppSelector } from "@/store/hooks";
import {
  selectTaskStatus,
  selectUpcomingTaskGroups,
  selectUpcomingTasks,
} from "@/store/tasks/task.selector";
import { TaskBoard } from "../inbox/task-board";
import { formatUpcomingDate } from "@/utils/date";
import { Error } from "@/components/common/error";
import { Spinner } from "@/components/common/spinner";

export const UpcomingPage = () => {
  const tasks = useAppSelector(selectUpcomingTasks);
  const groups = useAppSelector(selectUpcomingTaskGroups);
  const status = useAppSelector(selectTaskStatus);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Error />;
  }

  if (status === "succeeded" && groups.length === 0) {
    return <h3>No Upcoming tasks</h3>;
  }
  return (
    <>
      {groups.map((group) => (
        <section key={group.date}>
          <h2>{formatUpcomingDate(group.date)}</h2>

          <TaskBoard tasks={group.tasks} status="succeeded" />
        </section>
      ))}
    </>
  );
};

export default UpcomingPage;
