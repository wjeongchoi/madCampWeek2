import React from 'react';
import { View, Text, Button } from 'react-native';
import { HomeTabScreenProps } from '../navigation/types';

export const SearchMain: React.FC<HomeTabScreenProps<"Search">> = ()=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>검색</Text>
    </View>
  );
}
