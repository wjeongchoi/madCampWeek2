import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Linking,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { text, colors, padding, safe, center } from "../styles";
import { getRequest } from "../axios";
import { EllipticalText, Tag, RequestButton } from "../components";
import { Ingredient } from "../types/ingredient";
import { Cooker } from "../types/cooker";
import { AppHeader } from "../components";

export const ManRecipe = ({ route }) => {
  const { recipeId } = route.params;
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [manId, setManId] = useState(0);
  const [like, setLike] = useState("");
  const [level, setLevel] = useState(0);
  const [modifiedTime, setModifiedTime] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeCookers, setRecipeCookers] = useState([]);
  const [selectedCookers, setSelectedCookers] = useState([]);

  useEffect(() => {
    //const mockedRecipe = "1c222e02-d575-46e2-8669-b3dabb0ede23";
    //const recipeId = mockedRecipe;
    const tempUser = "058dd9c3-333b-4cb7-b05c-6e292f78960d";
    const userID = tempUser;
    getRequest(`recipes/${recipeId}`, (responseData) => {
      setTitle(responseData.title);
      setSubTitle(responseData.subTitle);
      setCookTime(responseData.cookTime);
      setManId(responseData.manId);
      setLike(responseData.like);
      setLevel(responseData.level);
      setModifiedTime(responseData.modifiedTime);
    });

    getRequest(`recipes/${recipeId}/ingredients`, (responseData) => {
      setRecipeIngredients([...responseData]);
      responseData.map((ingredients) => {
        setSelectedIngredients([...selectedIngredients, false]);
      });
    });

    getRequest(`recipes/${recipeId}/cookers`, (responseData) => {
      setRecipeCookers([...responseData]);
      responseData.map((cookers) => {
        setSelectedCookers([...selectedCookers, false]);
      });
    });
  }, []);
  const levelText = ["누구나", "초급", "중급", "고급", "상급"];


  return (
    <View>
      <AppHeader title={"만개의 레시피"} />
      <View style={[padding.horizontal(safe.horizontal), padding.vertical(12)]}>
        <Text style={[text.h2]} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={[text.body1]}>
          {subTitle}
        </Text>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>필요한 재료</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {recipeIngredients.map((ingredient: Ingredient, index: number) => {
              return (
                <Tag
                  key={index}
                  value={ingredient.ingredientName}
                  size={14}
                  color={colors.primary}
                  textColor={colors.black}
                  style={{ margin: 5 }}
                />
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={[text.h3, { textAlign: "center", marginBottom: 10 }]}>
              조리시간
            </Text>
            <Tag
              textColor={colors.black}
              color={colors.primary}
              size={20}
              value={`${cookTime}분 이내`}  // '분'을 cookTime 값 뒤에 추가
              style={{ width: 100 }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={[text.h3, { textAlign: "center", marginBottom: 10 }]}>
              난이도
            </Text>
            <Tag
              textColor={colors.black}
              color={colors.primary}
              size={20}
              value={levelText[level]}
              style={{ width: 100 }}
            />
          </View>
        </View>
      </View>
      <View style={[center, padding.vertical(16)]}>
        <TouchableOpacity
          onPress={() => {
            const url = `https://www.10000recipe.com/recipe/${manId}`;
            Linking.openURL(url);
          }}
        >
          <Image
            style={{
              width: 200,
              height: 50,
              overflow: "hidden",
            }}
            source={require("../assets/ManRecipeButton.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
