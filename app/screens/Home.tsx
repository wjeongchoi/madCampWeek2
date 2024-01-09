import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { HomeTabScreenProps } from '../navigation/types';
import { colors, text } from '../styles';
import { AppHeader, RequestButton, SearchBar } from '../components';
import { getRequest } from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Header from "../components/Header";


export const Home: React.FC<HomeTabScreenProps<"Home">> = ({ navigation }) => {
  const [researchText, setResearchText] = useState('');
  const [userID, setUserID] = useState('');
  const [myLikeRecipes, setMyLikeRecipes] = useState([]);  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem('userID');
        if (storedUserID !== null) {
          setUserID(storedUserID);
        }
      } catch (e) {
        // error reading value
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      console.log(`users/${userID}/recipes`);
      getRequest(`users/${userID}/recipes`, (responseData) => {
        console.log(responseData);
      });
    }
  }, [userID]);

  return (
    <View style={{ flex: 1, alignItems: 'center', gap:8}}>
      <AppHeader title={'앱 제목'}/>
      <SearchBar
        style={{width: 300}}
        onChangeText={() => {/* 추천 검색어 */}}
        onPress={()=> {/* 검색 */}}
        value={researchText}
        size={20}
        placeholder={"레시피를 검색해보세요"}
      />
      <View style={{width: 200, height: 250, alignItems: 'center'}}>
        <RequestButton
          text="재료 보기"
          size={20}
          style={{ width: 200, height: 200}}
          onPress={() => navigation.navigate('MyKitchenState')}/>
      </View>
      
      <Text style={[text.sub1]}>좋아요한 레시피</Text>
    </View>
  );
};
