import React from 'react';
import { Button,View} from 'react-native';

const FilterButton = ({ title, onPress, isActive }) => {
  return (

    <View style={{borderRadius: 50, overflow: 'hidden', marginRight: 10}}>
    <Button
      title={title}
      onPress={onPress}
      color={isActive ? 'red' : 'gray'}
    />
    </View>
  );
};

export default FilterButton;