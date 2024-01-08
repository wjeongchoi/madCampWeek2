import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { HomeTabScreenProps } from '../navigation/types';
import { colors, text } from '../styles';
import { ReqestButton, SearchBar } from '../components';
import { getRequest } from '../axios';



export const Home: React.FC<HomeTabScreenProps<"Home">> = ({ navigation }) => {
  const [researchText, setResearchText] = useState('');
  const [userID, setUserID]  = useState('');
  const [myLikeRecipes, setMyLikeRecipes] = useState([]);
  useEffect(() => {
    setUserID('0b2d9852-7982-4c88-a85a-2c46dc42a53f');
    console.log(`users/${userID}/recipes`);
    getRequest(`users/${userID}/recipes`,  (responseData) => {
      console.log(responseData);
      
      }
    );
    
  }, []);
  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
      <SearchBar
        style={{width: 300}}
        onChangeText={() => {/* 추천 검색어 */}}
        onPress={()=> {/* 검색 */}}
        value={researchText}
        size={20}
        placeholder={"레시피를 검색해보세요"}
      />
      <View style={{width: 200, height: 250, alignItems: 'center'}}>
        <ReqestButton
          text="재료 보기"
          size={20}
          style={{ width: 200, height: 200}}
          onPress={() => navigation.navigate('MyKitchenState')}/>
      </View>
      
      <Text style={[text.sub1]}>좋아요한 레시피</Text>
    </View>
  );
};
