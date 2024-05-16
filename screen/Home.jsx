import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, StyleSheet} from 'react-native';

import SeriesScreen from './SeriesScreen';
import SearchScreen from './SearchScreen';
import MovieTop from './MovieTop';
import TopPeople from './TopActorScreen';

const Tab = createBottomTabNavigator();

const screenOpts = {
  tabBarActiveTintColor: 'red',
  tabBarStyle: {backgroundColor: 'black'},
};

const movieOpts = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarIcon: ({color}) => <Icon name="file-movie-o" size={20} color={color} />,
};

const SearchOpts = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarIcon: ({color}) => <Icon name="search" size={20} color={color} />,
};

const seriesOpts = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarIcon: ({color}) => <Icon name="tv" size={20} color={color} />,
};

const starOpts = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarIcon: ({color}) => (
    <Image
      source={require('../starr.png')}
      style={{width: 20, height: 20, tintColor: color}}
    />
  ),
};

function Home() {
  return (
    <Tab.Navigator initialRouteName="Search" screenOptions={screenOpts}>
      <Tab.Screen name="Movies" component={MovieTop} options={movieOpts} />
      <Tab.Screen name="Search" component={SearchScreen} options={SearchOpts} />
      <Tab.Screen name="Series" component={SeriesScreen} options={seriesOpts} />
      <Tab.Screen name="Top Stars" component={TopPeople} options={starOpts} />
    </Tab.Navigator>
  );
}

export default Home;
