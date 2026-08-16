import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskState } from "../../api/task.type";

const initialState: TaskState = {
    items: [],
    status: 'idle',
    error: null
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.items = action.payload
        },
        addTask(state, action: PayloadAction<Task>) {
            state.items.push(action.payload)
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.items.findIndex(
                task => task.id === action.payload.id
            )

            if(index !== -1) {
                state.items[index] = action.payload
            }

            state.items.sort((a, b) => {
                if(a.isCompleted === b.isCompleted) {
                    return 0
                }

                return a.isCompleted ? 1 : -1
            })
        },
        removeTask(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                task => task.id !== action.payload
            )
        },
        setStatus(state, action: PayloadAction<TaskState['status']>) {
            state.status = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        }
    }
})

export const {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setStatus,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;