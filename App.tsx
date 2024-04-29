import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import SearchScreen from './screen/SearchScreen';
import MovieShow from './screen/MovieShow';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={SearchScreen}
           options={{title: 'Movie App'}} />
          <Stack.Screen name="Show" component={MovieShow}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
