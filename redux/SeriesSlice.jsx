import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const seriesSlice = createSlice({
    name: 'seriesshow',
    initialState,
    reducers: {
        fetchSeries(state,action){
            state.push(action.payload);
        },
    },
});

export const {fetchSeries} = seriesSlice.actions;
export default seriesSlice.reducer;