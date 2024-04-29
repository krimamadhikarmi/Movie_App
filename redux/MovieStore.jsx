import { configureStore } from "@reduxjs/toolkit";

const MovieStore = configureStore({
    reducer: {
        movieshow: MovieReducer,
    },
})

export default MovieStore;