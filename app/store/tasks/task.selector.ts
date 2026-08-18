import type { RootState } from "@/store";

export const selectAllTasks = (state: RootState) => {
  return [...state.tasks.items].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    return 0;
  });
};

export const selectTaskError = (state: RootState) => state.tasks.error;

const getDateOnly = (date: string) => {
  return date.slice(0, 10);
};

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const selectTodayTasks = (state: RootState) => {
  const today = getLocalDateString();

  return state.tasks.items.filter((task) => {
    if (!task.dueDate) return false;

    return getDateOnly(task.dueDate) === today;
  });
};

export const selectTaskStatus = (state: RootState) => state.tasks.status;
