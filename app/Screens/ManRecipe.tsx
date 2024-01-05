import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';

export const ManRecipe: React.FC = ()=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>만개의 레시피 세부정보</Text>
    </View>
  );
}
