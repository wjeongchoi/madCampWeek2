import React, {useState, useEffect} from 'react';
import { View, Text, Button, Linking , TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { text, colors } from '../styles';
import { getRequest } from '../axios';
import { EllipticalText, Tag, RequestButton } from '../components';
import { Ingredient } from '../types/ingredient';
import { Cooker } from '../types/cooker';

export const ManRecipe = ({ route }) => {
  const { recipeId } = route.params;
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [manId, setManId ] = useState(0);
  const [like, setLike] = useState('');
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeCookers, setRecipeCookers] = useState([]);
  const [selectedCookers, setSelectedCookers] =useState([]);



  useEffect(() => {
    //const mockedRecipe = "1c222e02-d575-46e2-8669-b3dabb0ede23";
    //const recipeId = mockedRecipe;
    const tempUser = '058dd9c3-333b-4cb7-b05c-6e292f78960d';
    const userID = tempUser;
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



  }, []);

  return (
    <SafeAreaView style={{alignItems: 'center', flexDirection: 'column', padding: 10 }}>
      <ScrollView style={{margin: 10}}>
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
      </ScrollView>
      <RequestButton onPress={() => {
        
         const url = `https://www.10000recipe.com/recipe/${manId}`;
         Linking.openURL(url);
      }}
      text={'만개의 레시피 바로가기'}
      size={26}/>
    </SafeAreaView>
  );
 } 
