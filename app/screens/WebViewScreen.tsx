import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
import { getRequest } from '../axios';
import queryString from 'query-string'; // 추가: queryString 라이브러리를 사용합니다.


type WebViewScreenRouteProp = RouteProp<{ WebViewScreen: { loginUrl: string } }, 'WebViewScreen'>;

type WebViewScreenNavigationProp = StackNavigationProp<any, 'WebViewScreen'>;

type Props = {
  route: WebViewScreenRouteProp;
  navigation: WebViewScreenNavigationProp;
};

export const WebViewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { loginUrl } = route.params;

  const handleNavigationStateChange = async (navState: any) => {
    if (navState.url.includes('http://3.145.159.152/auth/kakao/callback')) {
      // URL에서 Code 추출
      const urlParams = queryString.parseUrl(navState.url);
      const code = urlParams.query.code;

      if (code) {
        // getRequest를 호출하여 서버에 인증 코드 전달
        getRequest(`auth/kakao/callback?code=${code}`, (userData) => {
          const extractedUserId = userData.userID;
          AsyncStorage.setItem('userID', extractedUserId);
          navigation.navigate('HomeTab');
        }, (error) => {
          console.error('Failed to fetch user data:', error);
        });
      }
    }
  };

  return (
    <WebView 
      source={{ uri: loginUrl }} 
      onNavigationStateChange={handleNavigationStateChange} 
    />
  );
};