import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const ResultRecommend: React.FC<RootStackScreenProps<"MyKitchenState">> = ({navigation})=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.sub1]}>추천 결과</Text>
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