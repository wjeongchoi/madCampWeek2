import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { getRequest } from '../axios'

export const OwnRecipe = ({ route } ) => {
  const { recipeId } = route.params;
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [like, setLike] = useState(0);
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState('');

  useEffect(() => {
    console.log(recipeId, "reciped")
    getRequest(`recipes/${recipeId}`,  (responseData) => {
      console.log(responseData)
      setTitle(responseData.title)
      setSubTitle(responseData.subTitle)
      setCookTime(responseData.cookTime)
      setLike(responseData.like)
      setLevel(responseData.level)
      setModifiedTime(responseData.modifiedTime)
      }
    );

  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
    <Text style={[text.h1]}>{title}</Text>
    <Text style={[text.h3]}>{subTitle}</Text>
    <View style={{flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  }}>
      <Text style={{flex: 1, textAlign: "center"}}>조리시간: {cookTime}</Text>
      <Text style={{flex: 1, textAlign: "center"}}>좋아요: {like}</Text>
      <Text style={{flex: 1, textAlign: "center"}}>level: {level}</Text>
    </View>
    <Text style={[text.h3]}>{modifiedTime}</Text>
    <View>

    </View>
    </View>
  );
}
