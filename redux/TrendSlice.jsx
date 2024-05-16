import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const TrendSlice = createSlice({
    name: 'trendmovie',
    initialState,
    reducers: {
        addtrendMovie(state,action){
            return [...state, action.payload];
        }
    },
});


export const {addtrendMovie} = TrendSlice.actions;
export default TrendSlice.reducer;