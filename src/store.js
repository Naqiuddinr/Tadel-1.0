import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './feature/todoSlice'
import archiveReducer from './feature/archiveSlice'

export const store = configureStore({ reducer: { todos: todoReducer, archives: archiveReducer } })