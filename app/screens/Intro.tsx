import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const Intro: React.FC<RootStackScreenProps<"Intro">> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title="카카오 로그인" onPress={() => {/* 카카오 로그인 로직 */}} />
      <Button title="회원가입" onPress={() => navigation.navigate("SignUp")}/>
    </View>
  );
};