import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';

export const RecommendedKitchenState: React.FC = ()=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>추천 전 주방 상태</Text>
    </View>
  );
}
