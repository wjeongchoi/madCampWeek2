import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { HomeTabScreenProps } from '../navigation/types';
import { AppHeader } from '../components';

export const RecommendMain: React.FC<HomeTabScreenProps<"Recommend">> = ({ navigation })=> {
  return (
    <View style={{ flex: 1,  alignItems: 'center' }}>
      <AppHeader title={'레시피 추천'}/>
      <Text style={[text.sub1]}>추천</Text>
      <Text style={[text.body1]}>오늘의 추천메뉴 </Text>
      <Button
        title= '재료와 조리도구 보여주기'
        onPress={() => navigation.navigate('RecommendKitchenState')}
      >
      </Button>
    </View>
  );
}
