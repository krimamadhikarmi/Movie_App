import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SeriesSearch({ term, onTermChange, onTermSubmit }) {
  return (
    <View >
      <View >
        <TextInput
          style={{borderWidth: 1}}
          placeholder="Search Series"
          value={term}
          
        />
      </View>
    </View>
  );
}

