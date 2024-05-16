import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ActorSlice = createSlice({
    name: 'actorshow',
    initialState,
    reducers: {
        fetchActor(state,action){
            return [...state, action.payload];
        },
    },
});

export const {fetchActor} = ActorSlice.actions;
export default ActorSlice.reducer;