import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const MyKitchenState: React.FC<RootStackScreenProps<"MyKitchenState">> = ()=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>내 주방 상태</Text>
    </View>
  );
}
