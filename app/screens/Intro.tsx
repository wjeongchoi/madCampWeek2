import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Linking } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';
import { API_URL } from '@env';

export const Intro: React.FC<RootStackScreenProps<"Intro">> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleKakaoLogin = async () => {
    try {
      // This should be the endpoint that redirects to Kakao's login page
      const kakaoLoginUrl = `${API_URL}/users/kakao`;
      // Open the URL in the browser
      const supported = await Linking.canOpenURL(kakaoLoginUrl);
      if (supported) {
        await Linking.openURL(kakaoLoginUrl);
      } else {
        console.error("Can't open Kakao login URL");
      }
    } catch (error) {
      console.error("Kakao login error:", error);
    }
  };

  return (
    <View>
      <Image source={{ uri: '로고_이미지_URL' }} />
      <Text style={[text.h1]}>인트로</Text>
      <TextInput
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={() => {/* 로그인 로직 */}} />
      <Button title="카카오 로그인" onPress={handleKakaoLogin}  />
      <Button title="회원가입" onPress={() => navigation.navigate("SignUp")}/>
    </View>
  );
};