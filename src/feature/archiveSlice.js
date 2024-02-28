import { createSlice } from "@reduxjs/toolkit";

const archiveSlice = createSlice(
    {
        name: "archives",
        initialState: [],
        reducers: {
            addArchive: (state, action) => {
                state.push(action.payload)
            },
            deleteArchive: (state, action) => {
                const { id } = action.payload
                const deletedArchive = state.find(archive => archive.id == id);
                if (deletedArchive) {
                    return state.filter(archive => archive.id !== id)
                }
            }
        }
    })

export const { addArchive, deleteArchive } = archiveSlice.actions;

export default archiveSlice.reducer;