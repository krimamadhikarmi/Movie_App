import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const MovieSlice = createSlice({
    name: 'movieshow',
    initialState,
    reducers: {
        FetchMovie(state,action){
            state.push(action.payload);
        },
    },
});


export const {FetchMovie} = MovieSlice.actions;