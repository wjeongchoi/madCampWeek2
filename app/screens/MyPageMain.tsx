import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from '../axios';
import { text } from '../styles';
import { HomeTabScreenProps } from '../navigation/types';
import { UserData } from '../types/user';

export const MyPageMain: React.FC<HomeTabScreenProps<"MyPage">> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = await AsyncStorage.getItem('userID');
        console.log("UserID from AsyncStorage:", userID); // Ensure UserID is retrieved

        if (userID) {
          getRequest(
            `users/${userID}`,
            (response) => {
              console.log("API Response:", response); // Log the API response
              setUserData(response); // Set the user data
              console.log("Set UserData:", response); // Log the data being set
            },
            (error) => {
              console.error("Error fetching user data:", error);
            }
          );
        }
      } catch (error) {
        console.error("Error retrieving userID:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log("Current UserData State:", userData); // Log the current state

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h1]}>마이페이지</Text>
      {userData && (
        <>
          <Text style={[text.body1]}>이메일: {userData.email}</Text>
          <Text style={[text.body1]}>이름: {userData.name}</Text>
          <Text style={[text.body1]}>가입 날짜: {userData.createdTime}</Text>
          {userData.imgSrc && <Image source={{ uri: userData.imgSrc }} style={{ width: 100, height: 100 }} />}
        </>
      )}
    </View>
  );
}
