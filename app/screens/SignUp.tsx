import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { postRequest } from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from '../components';


export const SignUp: React.FC<RootStackScreenProps<"SignUp">> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');


  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userID = uuidv4(); // UUID 생성
    const userData = {
      userID: userID,
      email: email,
      name: nickname, // 별명 혹은 이름
      password: password, // 비밀번호 해싱은 백엔드에서 처리
      createdTime: new Date().toISOString().split('T')[0], // 현재 날짜 (YYYY-MM-DD 포맷)
      imgSrc: profileImage // 프로필 이미지 URL (혹은 기본값 "string")
    };

    postRequest(
      "users/", // API 경로
      userData,
      async (response) => {
        console.log("회원가입 성공:", response.data);
        try {
            await AsyncStorage.setItem('userID', userID);
            console.log("UserID stored successfully");
          } catch (error) {
            console.error("Error storing the userID:", error);
          }
        navigation.navigate("Intro");
      },
      (error) => {
        console.log(email,userID,password,nickname);
        console.error("회원가입 실패:", error);
      }
    );
  };

  return (
    <View>
      <Text style={[text.h1]}>회원가입</Text>
      <TextInput
        
        value={email}
        options={{placeholder: "이메일", onChangeText: setEmail}}
      />
      <TextInput
        value={nickname}
        options={{placeholder: "닉네임", onChangeText: setNickname}}
      />
      <TextInput
        value={password}
        options={{placeholder: "비밀번호", onChangeText: setPassword, secureTextEntry:true}}
      />
      <TextInput
        value={confirmPassword}
        options={{placeholder: "비밀번호", onChangeText: setConfirmPassword, secureTextEntry:true}}

      />
      {/* 프로필 사진 업로드 버튼을 추가할 수 있습니다. */}
      <Button title="프로필 사진 업로드" onPress={() => {/* 이미지 선택 로직 */}} />
      {profileImage && <Image source={{ uri: profileImage }}  />}
      <Button
        title="회원가입"
        onPress={handleSignUp} //onPress={() => navigation.navigate("HomeTab")}//
      ></Button>    
    </View>
  );
};

function alert(arg0: string) {
    throw new Error(arg0);
}
