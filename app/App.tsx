import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { RootStack } from './navigation/RootStack';


const fetchFonts = () => {
  return Font.loadAsync({
    "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.otf"),    // 필요한 경우 다른 폰트 스타일도 여기에 추가
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // 스플래시 스크린을 자동으로 숨기지 않음
    fetchFonts().then(() => {
      setFontLoaded(true);
      SplashScreen.hideAsync(); // 폰트 로딩 완료 후 스플래시 스크린 숨기기
    });
  }, []);

  if (!fontLoaded) {
    return null; // 폰트 로딩 중에는 아무것도 표시하지 않음
  }
  return (
      <RootStack />
  );
}