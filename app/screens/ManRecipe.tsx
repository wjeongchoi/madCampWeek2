import React, {useState, useEffect} from 'react';
import { View, Text, Button, Linking , TouchableOpacity } from 'react-native';
import { text } from '../styles';
import { getRequest } from '../axios';


export const ManRecipe = ({recipeId} : {recipeId: string}) => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [manId, setManId ] = useState(0);
  const [like, setLike] = useState(0);
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState('');

  useEffect(() => {
    getRequest(`recipes/${recipeId}`,  (responseData) => {
      setTitle(responseData.title);
      setSubTitle(responseData.subTitle);
      setCookTime(responseData.cookTime);
      setManId(responseData.manId);
      setLike(responseData.like);
      setLevel(responseData.level);
      setModifiedTime(responseData.modifiedTime);
      }
    );
      setTitle('어묵김말이')
      setSubTitle("맛있는 김말이에 쫄깃함을 더한 어묵 김말이예요")
      setCookTime("60분이내")
      setLike(0)
      setLevel(2)
      setModifiedTime("2024-01-06")
      setManId(128671);
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
