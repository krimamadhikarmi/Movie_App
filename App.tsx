import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import SearchScreen from './screen/SearchScreen';
import MovieShow from './screen/MovieShow';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MovieTop} from './components/MovieTop';
import {SeriesScreen} from './screen/SeriesScreen';
import {SeriesShow} from './screen/SeriesShow';
import TopPeople from './screen/TopActorScreen';

import ActorCombine from './screen/Actor';
import {Provider} from 'react-redux';
import MyStore from './redux/MyStore';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
        tabBarStyle: {backgroundColor: 'black'},
      }}>
      <Tab.Screen
        name="Movies"
        component={MovieTop}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'cornflowerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // tabBarIcon: ({red}) => <Icon name="file-movie-o" size={20}  color={red}  />,
          tabBarIcon: ({color}) => (
            <Icon name="file-movie-o" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'cornflowerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => (
            <Icon name="search" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={SeriesScreen}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'cornflowerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => <Icon name="tv" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Top Stars"
        component={TopPeople}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'cornflowerblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => (
            <Image
              source={require('./starr.png')}
              style={{width: 20, height: 20, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <View style={{flex: 1}}>
      <Provider store={MyStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Movie App',
                headerTitleAlign: 'center',
                headerTintColor: 'red',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},
              }}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen
              name="Show"
              component={MovieShow}
              options={{
                title: 'Movie',

                headerTintColor: 'gray',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
              }}
            />
            <Stack.Screen
              name="Series"
              component={SeriesShow}
              options={{
                title: 'Series',
                headerTintColor: 'gray',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
              }}
            />

            <Stack.Screen
              name="Act"
              component={ActorCombine}
              options={{
                title: 'Actor',

                headerTintColor: 'gray',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}
