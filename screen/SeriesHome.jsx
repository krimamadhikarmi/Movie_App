import {useState} from 'react';
import {Text, FlatList, View, TextInput, StyleSheet} from 'react-native';
import SeriesSearch from '../components/SeriesSearch';

export default function SeriesHome() {
  const [term, setTerm] = useState('');
  return (
    <View>
      <SeriesSearch
        term={term}
        onTermChange={setTerm}
       
      />
    </View>
  );
}
