import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import SearchScreen from './screen/SearchScreen';
import MovieShow from './screen/MovieShow';


import { MovieTop } from './components/MovieTop';
import { SeriesScreen } from './screen/SeriesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
  return(
    <Tab.Navigator>
        <Tab.Screen name='Top Movies' component={MovieTop} />
        <Tab.Screen name='Search' component={SearchScreen}/>
        <Tab.Screen name='TV' component={SeriesScreen}/>
    </Tab.Navigator>
  )
}
export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name='Home' component={Home} options={{title: 'Movie App'}}/>
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{title: 'Movie App'}}
          />
          <Stack.Screen name='Show' component={MovieShow}/>
        </Stack.Navigator>
        
      </NavigationContainer>
    </View>
  );
}
