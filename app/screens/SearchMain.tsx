import React from 'react';
import { View, Text, Button } from 'react-native';
import { HomeTabScreenProps } from '../navigation/types';
import { text } from '../styles';

export const SearchMain: React.FC<HomeTabScreenProps<"Search">> = ({navigation})=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.sub1]}>검색</Text>
      <Button
        title= '만개의 레시피'
        onPress={() => navigation.navigate('ManRecipe')}
      >
      </Button>
      <Button
        title= '자체 레시피'
        onPress={() => navigation.navigate('OwnRecipe')}
      >
      </Button>
    </View>
  );
}
