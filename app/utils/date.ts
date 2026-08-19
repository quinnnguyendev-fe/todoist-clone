import { getLocalDateString } from "@/store/tasks/task.selector";

export const formatUpcomingDate = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`);
  const today = new Date();

  const todayString = getLocalDateString(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const tomorrowString = getLocalDateString(tomorrow);

  if (dateString === todayString) {
    return "Today";
  }

  if (dateString === tomorrowString) {
    return "Tomorrow";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
};