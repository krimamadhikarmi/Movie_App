import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './MovieSlice';
import seriesReducer from './SeriesSlice';
import actorReducer from './ActorSlice';

const MyStore = configureStore({
    reducer: {
        movieshow: movieReducer,
        seriesshow: seriesReducer,
        actorshow: actorReducer,   
    },
})

export default MyStore;