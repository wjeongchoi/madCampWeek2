import React, {useEffect, useState} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { HomeTabScreenProps } from '../navigation/types';
import { border, colors, text } from '../styles';
import { getRequest } from '../axios';
import { Recipe } from '../types';
import { SearchBar, HorizontalRecipePreview, AppHeader } from '../components';

export const SearchMain: React.FC<HomeTabScreenProps<"Search">> = ({navigation})=> {
  const [recipes, setRecipes] = useState([]);
  const [searchText, onsearchText] = React.useState('');
  const [recommandTexts, setRecommandTexts] = useState([]);
  useEffect(() => {
    getRequest(
      "recipes/",
      (response) => {
        setRecipes([...response]);
      },
      (error) => {
        console.error("Error fetching recipes data:", error);
      }
    )
  },[])
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={'레시피 검색'}/>
      <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'center', 
      alignContent: 'center'
       }}>
        <SearchBar style={{width: 300}} 
              onPress={() => {/* 검색 버튼 누름 */}}
              onChangeText={() => { /* 텍스트 변함 -> 추천 검색어 기능 */}}
              size={20}
              value={searchText}
              placeholder={"래시피를 검색해보세요"}/>
      </View>
      <ScrollView style={{ display: "flex",
                            width: (Dimensions.get('window').width * 0.9)}}>
      {
          recipes.map((recipe : Recipe, index) => {
            return (
              <TouchableOpacity onPress={() => {
                recipe.manId ? 
                navigation.navigate('ManRecipe', { recipeId: recipe.recipeID } as { recipeId: string }) :
                navigation.navigate('OwnRecipe', { recipeId: recipe.recipeID } as { recipeId: string });
              
              }}>
                <HorizontalRecipePreview imgPath={'https://podicmaster.cdn3.cafe24.com/artworks/0094.png'}
                style={{backgroundColor: colors.gray50}}
                recipe={recipe} />
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  );
}
