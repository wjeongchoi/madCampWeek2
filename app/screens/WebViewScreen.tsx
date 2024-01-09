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

  const [codeProcessed, setCodeProcessed] = useState(false); // 중복 호출 방지를 위한 상태 변수

  const handleNavigationStateChange = async (navState: any) => {
    if (navState.url.includes('http://3.145.159.152/auth/kakao/callback') && !codeProcessed) {
      const urlParams = queryString.parseUrl(navState.url);
      const code = urlParams.query.code;

      if (code) {
        setCodeProcessed(true);
        getRequest(`auth/kakao/callback?code=${code}`, (userData) => {
          const extractedUserId = userData.userID;
          AsyncStorage.setItem('userID', extractedUserId);
          navigation.navigate('HomeTab');
        }, (error) => {
          console.error('Failed to fetch user data:', error);
          navigation.navigate('HomeTab');
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