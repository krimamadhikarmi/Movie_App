import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const MovieSlice = createSlice({
    name: 'movieshow',
    initialState,
    reducers: {
        FetchMovie(state,action){
            state.push(action.payload);
        },
        addtrendMovie(state,action){
            state.push(action.payload)
        }
    },
});


export const {FetchMovie,addtrendMovie} = MovieSlice.actions;
export default MovieSlice.reducer;