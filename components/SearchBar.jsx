import {Text, TextInput, View} from 'react-native';


export function SearchBar({term,onTermChange,onTermSubmit}) {
  return (
    <View>
    
      <TextInput
        style={{
          borderColor: 'black',
          margin: 15,
          borderWidth: 1,
          backgroundColor: '#F0EEEE',
          borderRadius: 10,
        }}
        placeholder="Search Items"
        value={term}
        onChangeText={newTerm=>onTermChange(newTerm)}
        onEndEditing={onTermSubmit}
        
      />
      <Text>{term}</Text>
      
    </View>
  );
}
