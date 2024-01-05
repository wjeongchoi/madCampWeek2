import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const UploadRecipe: React.FC<RootStackScreenProps<"UploadRecipe">> =({ navigation })=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>레시피 업로드</Text>
    </View>
  );
}