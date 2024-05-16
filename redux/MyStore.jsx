import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './MovieSlice';
import seriesReducer from './SeriesSlice';
import actorReducer from './ActorSlice';
import trendReducer from './TrendSlice';

const MyStore = configureStore({
    reducer: {
        movieshow: movieReducer,
        seriesshow: seriesReducer,
        actorshow: actorReducer,   
        trendmovie: trendReducer,
    },
});

export default MyStore;