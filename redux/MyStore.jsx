import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './MovieSlice';
import seriesReducer from './SeriesSlice';
const MyStore = configureStore({
    reducer: {
        movieshow: movieReducer,
        seriesshow: seriesReducer,
    },
})

export default MyStore;