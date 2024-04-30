import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import SearchScreen from './screen/SearchScreen';
import MovieShow from './screen/MovieShow';
import Icon from 'react-native-vector-icons/FontAwesome';


import { MovieTop } from './components/MovieTop';
import { SeriesScreen } from './screen/SeriesScreen';
import { SeriesShow } from './screen/SeriesShow';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
  return(
    
    <Tab.Navigator>
        <Tab.Screen name='Movies' component={MovieTop}  options={{tabBarIcon:()=>(
          <Icon name="file-movie-o"/>
        )}}/>
        <Tab.Screen name='Search' component={SearchScreen} options={{tabBarIcon:()=>(
          <Icon name="search"/>
        )}}/>
        <Tab.Screen name='TV' component={SeriesScreen}  options={{tabBarIcon:()=>(
          <Icon name="tv"/>
        )}}/>
    </Tab.Navigator>
    
  )
}
export default function App() {
  return (
    <View style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name='Home' component={Home} options={{title: 'Movie App'}}/>
          <Stack.Screen
            name="Search"
            component={SearchScreen}
               
          />
          <Stack.Screen name='Show' component={MovieShow}/>
          <Stack.Screen name='Series' component={SeriesShow}/>
        </Stack.Navigator>
        
      </NavigationContainer>
    </View>
  );
}
