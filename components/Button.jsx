import React, {memo} from 'react';
import {Button, StyleSheet, View} from 'react-native';

const FilterButton = ({title, onPress, isActive}) => {
  return (
    <View style={styles.buttonView}>
      <Button
        title={title}
        onPress={onPress}
        color={isActive ? 'red' : 'gray'}
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 10,
  },
  buttonStyle: {
    alignItems: 'center',
  },
});

export default memo(FilterButton);