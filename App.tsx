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
import { Provider } from 'react-redux';
import MyStore from './redux/MyStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MovieTop}
        options={{
          tabBarIcon: () => <Icon name="file-movie-o" size={20} color="gray" />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => <Icon name="search" size={20} color="gray" />,
        }}
      />
      <Tab.Screen
        name="TV"
        component={SeriesScreen}
        options={{tabBarIcon: () => <Icon name="tv" size={20} color="gray" />}}
      />
      <Tab.Screen
        name="Top Stars"
        component={TopPeople}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./starr.png')}
              style={{width: 20, height: 20, tintColor: 'gray'}} />
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
        <Stack.Navigator
          initialRouteName="Home"
          >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Movie App',
              headerTitleAlign: 'center',
              headerTitleStyle: {fontSize: 25, fontWeight: 'bold'},
            }}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Show" component={MovieShow} />
          <Stack.Screen name="Series" component={SeriesShow} />

          <Stack.Screen name="Act" component={ActorCombine} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </View>
  );
}
