import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import SearchScreen from './screen/SearchScreen';
import MovieShow from './screen/MovieShow';
import Icon from 'react-native-vector-icons/FontAwesome';

import {MovieTop} from './components/MovieTop';
import {SeriesScreen} from './screen/SeriesScreen';
import {SeriesShow} from './screen/SeriesShow';
import TopPeople from './screen/TopActor';
import ActorShow from './screen/ActorShow';
import ActorCredit from './screen/ActorCredit';


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
        name="People"
        component={TopPeople}
        options={{tabBarIcon: () => <Icon name="tv" size={20} color="gray" />}}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
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
          <Stack.Screen name="Actor" component={ActorShow} />
          <Stack.Screen name="Credit" component={ActorCredit} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
