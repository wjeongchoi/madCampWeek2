import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';

export const OwnRecipe: React.FC = ()=>{
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>자체 레시피</Text>
    </View>
  );
}
