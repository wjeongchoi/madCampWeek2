import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';

export const SignUp: React.FC<RootStackScreenProps<"SignUp">> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // 가정: 회원가입 로직을 여기에 구현합니다.

  return (
    <View>
      <Text style={[text.h1]}>회원가입</Text>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {/* 프로필 사진 업로드 버튼을 추가할 수 있습니다. */}
      <Button title="프로필 사진 업로드" onPress={() => {/* 이미지 선택 로직 */}} />
      {profileImage && <Image source={{ uri: profileImage }}  />}
      <Button
        title="회원가입"
        onPress={() => navigation.navigate("HomeTab")}
      ></Button>    
    </View>
  );
};