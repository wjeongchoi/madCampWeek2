import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { text, colors } from '../styles';
import { getRequest } from '../axios'
import { EllipticalText, Tag, RecipeDetail } from '../components';
import { DetailRecipe } from '../types/detailRecipe';

export const OwnRecipe = ({ route } ) => {
  const { recipeId } = route.params;
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [like, setLike] = useState(0);
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeCookers, setRecipeCookers] = useState([]);
  const [selectedCookers, setSelectedCookers] =useState([]);
  const [detailRecipes, setDetailRecipes] = useState([]);

  useEffect(() => {
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

    getRequest(`recipes/${recipeId}/ingredients`, (responseData) => {
      setRecipeIngredients([...responseData]);
      responseData.map((ingredients) => {
          setSelectedIngredients([...selectedIngredients, false]);
        });
      }
    );

    getRequest(`recipes/${recipeId}/cookers`, (responseData) => {
      setRecipeCookers([...responseData]);
      responseData.map((cookers) => {
          setSelectedCookers([...selectedCookers, false]);
        });
      }
    );

    getRequest(`recipes/${recipeId}/details`, (responseData) => {
      setDetailRecipes([...responseData]);
    });
  }, []);

  return (
    <View style={{alignItems: 'center', flexDirection: 'column', padding: 10 }}>
      <View style={{margin: 10}}>
        <EllipticalText numberOfLines={1} fontSize={24} text={title} />
        <EllipticalText numberOfLines={2} fontSize={16} text={subTitle}/>
        <Text style={[text.h3]}>필요한 재료</Text>
        <View style={{flexDirection: 'row'}}>
          {
            recipeIngredients.map((ingredient : Ingredient, index : number) => {
                return (<Tag size={20} 
                  value={ingredient.ingredientName} 
                  isSelected={selectedIngredients[index]}
                  color={colors.primary}
                  textColor={colors.primaryDark}
                  style={{width: 100, margin: 10}}
                  onPress={() => {
                    const newSelected = selectedIngredients;
                    newSelected[index] = !newSelected[index];
                    setSelectedIngredients([...newSelected]);
                  }} />)
            })
          }
        </View>
        { /* 내 냉장고에 재료가 있는지 여부에 따라 bool을 리턴하는 api 필요*/ }
        <Text style={[text.h3]}>필요한 조리도구</Text>
        <View style={{flexDirection: 'row'}}>
          {
            recipeCookers.map((cooker : Cooker, index : number) => {
                return (<Tag size={20} 
                  value={cooker.cookerName} 
                  isSelected={selectedCookers[index]}
                  color={colors.primary}
                  textColor={colors.primaryDark}
                  style={{width: 100, margin: 10}}
                  onPress={() => {
                    const newSelected = selectedCookers;
                    newSelected[index] = !newSelected[index];
                    setSelectedCookers([...newSelected]);
                  }} />)
            })
          }
          
        </View>
        <View style={{flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      marginTop: 20
                      }}>
          <View
            style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 20, textAlign: "center", marginBottom: 10}}>조리시간</Text>
            <Tag textColor={colors.black}
                color={colors.primary}
                size={20}
                value={cookTime}
                style={{width: 100}}/> 
          </View>
          <View
            style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 20, textAlign: "center", marginBottom: 10}}>난이도</Text>
            <Tag textColor={colors.black}
             color={colors.primary}
              size={20}
               value={String(level)}
               style={{width: 100}}/> 
          </View>
        </View>
      </View>
      <View>
        {
          detailRecipes.map((detailRecipe : DetailRecipe) => {
            console.log(detailRecipe)
            return (<RecipeDetail detailRecipe={detailRecipe} /> )
          })
        }
      </View>
    </View>
  );
}
