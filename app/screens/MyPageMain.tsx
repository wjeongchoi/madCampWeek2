import React, {useEffect, useState} from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getRequest } from '../axios';
import { margin, text } from '../styles';
import imageSrc from '../assets/favicon.png';

export const MyPageMain = ({email} : {email: string}) => {
  const [imagesSrc, setImagesSrc] = useState('');
  const [createdTime, setCreatedTime] = useState('');
  const [name, setName] = useState('');


  useEffect(() => {
    getRequest(`users/${email}`,  (responseData) => {
      setImagesSrc(responseData.imagesSrc)
      setCreatedTime(responseData.createdTime)
      setName(responseData.name)
      }
    );
    setImagesSrc("./assets/favicon.png")
    setCreatedTime("2024-01-06")
    setName("신지섭")
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{marginTop: 40, fontSize: 30}}>{name} 님</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text>가입일: </Text>
        <Text >{createdTime}</Text>
      </View>
      <View>
        <Image source={imageSrc} alt="imagesSrc"></Image>
      </View>
     
    </View>
  );
}

