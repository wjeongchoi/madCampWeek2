import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for your navigation prop
type HomeProps = {
  navigation: StackNavigationProp<any, any>;
};

// Your component now uses the HomeProps type
export default function Home({ navigation }: HomeProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>홈</Text>
      <Button
        title="검색"
        onPress={() => navigation.navigate('검색')}
      />
      <Button
        title="추천"
        onPress={() => navigation.navigate('추천')}
      />
      <Button
        title="커뮤니티"
        onPress={() => navigation.navigate('커뮤니티')}
      />
      <Button
        title="마이페이지"
        onPress={() => navigation.navigate('마이페이지')}
      />
    </View>
  );
}
