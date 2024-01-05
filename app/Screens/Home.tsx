import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { HomeTabScreenProps } from '../navigation/types';
import { text } from '../styles';


export const Home: React.FC<HomeTabScreenProps<"Home">> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h2]}>홈</Text>
      <Button
        title="검색"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="재료 보기"
        onPress={() => navigation.navigate('MyKitchenState')}
      />
      <Text style={[text.sub1]}>많이 찾아본 레시피</Text>
    </View>
  );
};
