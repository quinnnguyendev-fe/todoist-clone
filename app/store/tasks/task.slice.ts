import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Task, TaskState } from "../../api/task.type";
import { todoApi } from "@/api";

const initialState: TaskState = {
  items: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      const firstCompletedIndex = state.items.findIndex(
        (task) => task.isCompleted,
      );

      if (firstCompletedIndex === -1) {
        state.items.push(action.payload);
        return;
      }

      state.items.splice(firstCompletedIndex, 0, action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }

      state.items.sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
          return 0;
        }

        return a.isCompleted ? 1 : -1;
      });
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    setStatus(state, action: PayloadAction<TaskState["status"]>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch tasks";
      });
  },
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await todoApi.getList();
});

export const {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setStatus,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;
