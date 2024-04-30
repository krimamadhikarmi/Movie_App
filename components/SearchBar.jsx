import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function SearchBar({ term, onTermChange, onTermSubmit }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="search" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search Items"
          value={term}
          onChangeText={newTerm => onTermChange(newTerm)}
          onEndEditing={onTermSubmit}
        />
      </View>
      <Text>{term}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F0EEEE',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    color: 'gray',
    marginLeft: 10,
  },
});
