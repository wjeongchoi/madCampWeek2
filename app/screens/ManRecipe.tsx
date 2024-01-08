import React, {useState, useEffect} from 'react';
import { View, Text, Button, Linking , TouchableOpacity, Image } from 'react-native';
import { text } from '../styles';
import { getRequest } from '../axios';


export const ManRecipe = ({recipeId} : {recipeId: string}) => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [manId, setManId ] = useState(0);
  const [like, setLike] = useState('');
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState('');

  useEffect(() => {
    const mockedRecipe = "1c222e02-d575-46e2-8669-b3dabb0ede23";
    const recipeId = mockedRecipe;
    getRequest(`recipes/${recipeId}`, (responseData) => {
      setTitle(responseData.title);
      setSubTitle(responseData.subTitle);
      setCookTime(responseData.cookTime);
      setManId(responseData.manId);
      setLike(responseData.like);
      setLevel(responseData.level);
      setModifiedTime(responseData.modifiedTime);
      }
    );
  }, []);

  return (
    <View style={{alignItems: 'center', flexDirection: 'column' }}>
      <Image source={require('../assets/icon.png')}
          style={{  width: 120, height: 120, marginRight: 10  }}/>
      <View >
        <Text style={[text.h1]}>{title}</Text>
        <Text style={[text.h3]}>{subTitle}</Text>
        <View style={{flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      }}>
          <Text style={{flex: 1, textAlign: "center"}}>조리시간: {cookTime}</Text>
          <Text style={{flex: 1, textAlign: "center"}}>좋아요: {like}</Text>
          <Text style={{flex: 1, textAlign: "center"}}>난이도: {level}</Text>
        </View>
      </View>
      <Text style={[text.h3]}>{modifiedTime}</Text>
      <TouchableOpacity onPress={() => {
          const url = `https://www.10000recipe.com/recipe/${manId}`;
          Linking.openURL(url);
        }}>
        <Text style={[text.h2]}>
          만개의 레시피 링크
        </Text>
      </TouchableOpacity>
    </View>
  );
 } 
