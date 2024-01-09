import React, {useEffect, useState} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import {colors, text} from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { getRequest } from '../axios';
import { AppHeader, HoriziontalRecipePreview} from "../components";
import { Recipe } from '../types';

export const ResultRecommend: React.FC<RootStackScreenProps<"MyKitchenState">> = ({navigation})=> {
  const [recipes, setRecipes] = useState([]);
  const [recommandTexts, setRecommandTexts] = useState([]);
  useEffect(() => {
    // TODO: get recipes using my ingredients 

    // getRequest(
    //   "recipes/",
    //   (response) => {
    //     setRecipes([...response]);
    //   },
    //   (error) => {
    //     console.error("Error fetching recipes data:", error);
    //   }
    // )
  },[])
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={'유저 레시피'}/>
      <View style={{ flexDirection: 'row', marginLeft: 10}}>
        <Text style={[text.h1]}>당신을 위한 레시피</Text>
        <Image
        source={require("../assets/sparkles.png")}
        style={{ width: 25, height: 25 }}
      />
      </View>
      <View style={{flexDirection: "row", 
      marginLeft: 10,
      width: 300, 
      borderColor: colors.gray100,
      borderWidth: 2,
      borderRadius: 10,}} >
        <Ionicons name="search" color={colors.gray100} size={30} 
        onPress={() => { console.log("dddd")/* call search function */ }}/>
        <TextInput

          keyboardType="web-search"
          onChangeText={(text) => {
            // call recommand text function
          }}
          placeholder="키워드 검색"
        />  
      </View>
      
    <ScrollView style={{ display: "flex",
                          width: (Dimensions.get('window').width * 0.9)}}>
    {
        recipes.map((recipe : Recipe, index) => {
          return (
            <TouchableOpacity onPress={() => {
              const recipeId= recipe.recipeID;
              navigation.navigate('OwnRecipe', { recipeId: recipeId } as { recipeId: string });
            }}>
              <HoriziontalRecipePreview imgPath={'https://podicmaster.cdn3.cafe24.com/artworks/0094.png'} 
              recipe={recipe}
              style={{backgroundColor: colors.gray100}} />
            </TouchableOpacity>
          )
        })
      }

    </ScrollView>
     
    </View>
  );
}