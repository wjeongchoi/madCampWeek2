import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { getRequest } from '../axios'
import { AppHeader } from '../components';

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
    <View style={{ flex: 1}}>
      <AppHeader title={'유저 레시피'}/>
      <Text style={{fontSize: 24, textAlign: 'left', alignContent: 'flex-start', margin: 10}}>{title}</Text>
      <Text style={{fontSize: 18, margin: 10}}>{subTitle}</Text>
      <View> 
        {/* 조리도구 보여주기*/}
      </View>
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
