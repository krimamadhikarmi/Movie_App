import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import MovieShow from './MovieShow';
import {SeriesShow} from './SeriesShow';
import ActorCombine from './Actor';

const Stack = createNativeStackNavigator();

const homeOpts = {
  title: 'Movie App',
  headerTitleAlign: 'center',
  headerTintColor: 'red',
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},
};

const movieOpts = {
  title: 'Movie',
  headerTintColor: 'gray',
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
};

const seriesOpts = {
  title: 'Series',
  headerTintColor: 'gray',
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
};

const actorOpts = {
  title: 'Actor',
  headerTintColor: 'gray',
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
};

function StackHome() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={homeOpts} />
      <Stack.Screen name="Show" component={MovieShow} options={movieOpts} />
      <Stack.Screen name="SeriesShow" component={SeriesShow} options={seriesOpts}/>
      <Stack.Screen name="Act" component={ActorCombine} options={actorOpts} />
    </Stack.Navigator>
  );
}

export default StackHome;
