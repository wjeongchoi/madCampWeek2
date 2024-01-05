import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { HomeTabScreenProps } from '../navigation/types';


export const Home: React.FC<HomeTabScreenProps<"Home">> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>홈</Text>
      <Button
        title="검색"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="재료 보기"
        onPress={() => navigation.navigate('MyKitchenState')}
      />
      <Button
        title="추천"
        onPress={() => navigation.navigate('Recommend')}
      />
      <Button
        title="커뮤니티"
        onPress={() => navigation.navigate('Community')}
      />
      <Button
        title="마이페이지"
        onPress={() => navigation.navigate('MyPage')}
      />
    </View>
  );
};
