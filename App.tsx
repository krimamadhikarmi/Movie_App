import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';

import MyStore from './redux/MyStore';
import StackHome from './screen/StackHome';


export default function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={MyStore}>
        <NavigationContainer>
          <StackHome/>
        </NavigationContainer>
      </Provider>
    </View>
  );
}
