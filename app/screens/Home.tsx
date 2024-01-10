import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRequest } from "../axios";
import { AppHeader, SearchBar, Tag } from "../components";
import {
  colors,
  column,
  gap,
  margin,
  padding,
  round,
  row,
  safe,
  text,
} from "../styles";
import { VerticalRecipePreview } from "../components/VerticalRecipePreview";
import { Ionicons } from "@expo/vector-icons";
import { HomeTabScreenProps } from "../navigation/types";
import { useFocusEffect } from "@react-navigation/native";

export const Home: React.FC<HomeTabScreenProps<"Home">> = ({ navigation }) => {
  const [userID, setUserID] = useState("");
  const [myIngredients, setMyIngredients] = useState([]);
  const [myCookers, setMyCookers] = useState([]);
  const [likeRecipes, setLikeRecipes] = useState([]);

  const fetchData = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem("userID");
      if (storedUserID !== null) {
        setUserID(storedUserID);
        getRequest(`users/${storedUserID}/ingredients`, setMyIngredients);
        getRequest(`users/${storedUserID}/cookers`, setMyCookers);
        getRequest(`users/${storedUserID}/like/recipes`, setLikeRecipes);
      }
    } catch (e) {
      console.error("Error fetching data: ", e);
    }
  };

  // 화면 포커스 시 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("userID");
        if (storedUserID !== null) {
          setUserID(storedUserID);
        }
      } catch (e) {
        // error reading value
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      getRequest(`users/${userID}/ingredients`, setMyIngredients);
      getRequest(`users/${userID}/cookers`, setMyCookers);
      getRequest(`users/${userID}/like/recipes`, setLikeRecipes);
    }
  }, [userID]);

  return (
    <View>
      <AppHeader title={"맞춤혼밥"} />
      <View
        style={[
          padding.horizontal(safe.horizontal),
          column,
          padding.top(16),
          gap(8),
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <View
            style={[
              round.md,
              {
                backgroundColor: colors.gray200,

                padding: 10,
                alignItems: "center",

                flexDirection: "row",
              },
            ]}
          >
            <Ionicons name="search" color={colors.gray500} size={20} />
            <Text
              style={[margin.left(6), text.btn2, { color: colors.gray500 }]}
            >
              레시피를 검색해보세요
            </Text>
          </View>
        </TouchableOpacity>

        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>내 재료</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {myIngredients.length > 0 ? (
              myIngredients.map((ingredient, index) => (
                <Tag
                  key={index}
                  value={ingredient.ingredientName}
                  size={14}
                  color={colors.primary}
                  textColor={colors.black}
                  style={{ margin: 5 }}
                />
              ))
            ) : (
              <Text style={[text.btn1, { color: colors.gray400 }]}>
                ! 아직 비어있어요 !
              </Text>
            )}
          </View>
        </View>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>내 조리도구</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {myCookers.length > 0 ? (
              myCookers.map((cooker, index) => (
                <Tag
                  key={index}
                  value={cooker.cookerName}
                  size={14}
                  color={colors.primary}
                  textColor={colors.primaryDark}
                  style={{ margin: 5 }}
                />
              ))
            ) : (
              <Text style={[text.btn1, { color: colors.gray400 }]}>
                ! 아직 비어있어요 !
              </Text>
            )}
          </View>
        </View>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>좋아요한 레시피</Text>
          <ScrollView style={[row]} horizontal={true}>
            {likeRecipes.length > 0 ? (
              likeRecipes.map((recipe, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    recipe.manId
                      ? navigation.navigate("ManRecipe", {
                          recipeId: recipe.recipeID,
                        } as { recipeId: string })
                      : navigation.navigate("OwnRecipe", {
                          recipeId: recipe.recipeID,
                        } as { recipeId: string });
                  }}
                >
                  <VerticalRecipePreview
                    key={index}
                    recipe={recipe}
                    imgSrc={recipe.imgSrc}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[text.btn1, { color: colors.gray400 }]}>
                ! 아직 비어있어요 !
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
