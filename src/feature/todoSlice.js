import { createSlice } from "@reduxjs/toolkit";



const todoSlice = createSlice(
    {
        name: "todos",
        initialState: [],
        reducers: {
            addTodo: (state, action) => {
                state.push(action.payload)
            },
            editTodo: (state, action) => {
                const { id, title, description, completed } = action.payload;
                const updatedTodo = state.find(todo => todo.id == id)
                if (updatedTodo) {
                    updatedTodo.title = title;
                    updatedTodo.description = description;
                    updatedTodo.completed = completed
                }
            },
            deleteTodo: (state, action) => {
                const { id } = action.payload;
                const deletedTodo = state.find(todo => todo.id == id);
                if (deletedTodo) {
                    return state.filter(todo => todo.id !== id)
                }
            }
        }
    })

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
