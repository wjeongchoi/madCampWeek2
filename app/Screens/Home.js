import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({ navigation }) {
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
