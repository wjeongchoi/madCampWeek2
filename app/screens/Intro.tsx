import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const Intro: React.FC<RootStackScreenProps<"Intro">> = ()=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>인트로</Text>
    </View>
  );
}
