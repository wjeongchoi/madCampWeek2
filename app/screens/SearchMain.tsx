import React, {useEffect, useState} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { HomeTabScreenProps } from '../navigation/types';
import { border, text } from '../styles';
import { getRequest } from '../axios';
import { Recipe } from '../types';
import { RecipePreview } from '../components/RecipePreview';
import { TextInput } from 'react-native-gesture-handler';

export const SearchMain: React.FC<HomeTabScreenProps<"Search">> = ({navigation})=> {
  const [recipes, setRecipes] = useState([]);
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


      console.log(recipes)
  },[])
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'center' }}>
        <TextInput
          style={[border.gray100]}
          keyboardType="web-search"
          onChangeText={(text) => {
            // call recommand text function
          }}
          placeholder="useless placeholder"
        />
        <Button style={{ marginLeft: 10 }}
                title="검색"
                
                onPress={() => {/* call search function */ }}/>
      </View>
      <View style={{ flexDirection: "row"}}>
        <Button
          title= '만개의 레시피'
          onPress={() => navigation.navigate('ManRecipe')}
        >
        </Button>
        <Button
          title= '자체 레시피'
          onPress={() => navigation.navigate('OwnRecipe')}
        >
        </Button>
      </View>
      
    <ScrollView style={{ display: "flex",
                          width: (Dimensions.get('window').width * 0.9)}}>
    {
        recipes.map((recipe : Recipe) => {
          return (
            <TouchableOpacity onPress={() => {
              const url = `https://www.10000recipe.com/recipe/${manId}`;
              Linking.openURL(url);
            }}>
            <Text style={[text.h2]}>
              만개의 레시피 링크
            </Text>
          
              <RecipePreview 
                imgSrc={"mockImage.png"}         
                title={recipe.title}
                like={recipe.like}
                level={recipe.level}
                cookTime={recipe.cookTime} />
            </TouchableOpacity>
          )
        })
      }

    </ScrollView>
     
    </SafeAreaView>
  );
}
