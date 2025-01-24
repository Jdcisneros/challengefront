import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoState {
  tasks: { id: number; title: string; completed: boolean }[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  tasks: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTasks(state, action: PayloadAction<TodoState['tasks']>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<TodoState['tasks'][number]>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<TodoState['tasks'][number]>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setTasks, addTask, deleteTask, updateTask, setError } = todoSlice.actions;
export default todoSlice.reducer;