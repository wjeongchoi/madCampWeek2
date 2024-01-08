import React, { useState } from 'react';
import { View, Text,  Button, Image, StyleSheet, Linking } from 'react-native';
import { text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest, postRequest } from '../axios';
import { TextInput } from '../components';

export const Intro: React.FC<RootStackScreenProps<"Intro">> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Construct the URL with query parameters
      const loginURL = `users/login?email=${encodeURI(email)}&password=${encodeURI(password)}`;
  
      getRequest(
        loginURL,
        async (response) => {
          // Add a log to check the structure of the response
          console.log("Login response:", response);
  
            const userID = response.userID;
            await AsyncStorage.setItem('userID', userID);
            console.log("Login successful, userID stored");
            navigation.navigate("HomeTab");

        },
        (error) => {
          // Log the error object to understand the nature of the error
          console.error("Login error:", error);
        }
      );
    } catch (error) {
      console.error("Login exception:", error);
    }
  };
  

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
        value={email}
        options={{placeholder:"이메일", onChangeText:setEmail}}
      />
      <TextInput
        secureTextEntry
        value={password}
        options={{placeholder:"비밀번호", onChangeText:setPassword}}
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="카카오 로그인" onPress={handleKakaoLogin}  />
      <Button title="회원가입" onPress={() => navigation.navigate("SignUp")}/>
    </View>
  );
};