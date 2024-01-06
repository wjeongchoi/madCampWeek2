import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { getRequest } from '../axios'

export const OwnRecipe = ({recipeId} : {recipeId: string}) => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [like, setLike] = useState(0);
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState('');

  useEffect(() => {
    getRequest(`recipes/${recipeId}`,  (responseData) => {
      setTitle(responseData.title)
      setSubTitle(responseData.subTitle)
      setCookTime(responseData.cookTime)
      setLike(responseData.like)
      setLevel(responseData.level)
      setModifiedTime(responseData.modifiedTime)
      }
    );
      setTitle('어묵김말이')
      setSubTitle("맛있는 김말이에 쫄깃함을 더한 어묵 김말이예요")
      setCookTime("60분이내")
      setLike(0)
      setLevel(2)
      setModifiedTime("2024-01-06")
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
    <Text style={[text.h1]}>{title}</Text>
    <Text style={[text.h3]}>{subTitle}</Text>
    <View style={{flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  }}>
      <Text style={{flex: 1, textAlign: "center"}}>{cookTime}</Text>
      <Text style={{flex: 1, textAlign: "center"}}>{like}</Text>
      <Text style={{flex: 1, textAlign: "center"}}>{level}</Text>
    </View>
    <Text style={[text.h3]}>{modifiedTime}</Text>
    </View>
  );
}
