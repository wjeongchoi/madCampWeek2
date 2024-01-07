import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const SignUp: React.FC<RootStackScreenProps<"SignUp">> = ()=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>회원가입</Text>
    </View>
  );
}
