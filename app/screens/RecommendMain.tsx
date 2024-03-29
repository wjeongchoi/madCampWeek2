import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { colors, padding, safe, text } from "../styles";
import { HomeTabScreenProps } from "../navigation/types";
import { AppHeader, Tag } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { getRequest } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VerticalRecipePreview } from "../components/VerticalRecipePreview";
import { useFocusEffect } from "@react-navigation/native";

export const RecommendMain: React.FC<HomeTabScreenProps<"Recommend">> = ({
  navigation,
}) => {
  const [userID, setUserID] = useState("");
  const [myIngredients, setMyIngredients] = useState([]);
  const [myCookers, setMyCookers] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  const refreshData = async () => {
    const storedUserID = await AsyncStorage.getItem("userID");
    if (storedUserID !== null) {
      setUserID(storedUserID);

      getRequest(`users/${storedUserID}/ingredients`, setMyIngredients);
      getRequest(`users/${storedUserID}/cookers`, setMyCookers);
      const skip = Math.floor(Math.random() * 10000); // 예제 코드에서 사용된 랜덤 스킵 값
      getRequest(`recipes?skip=${skip}&limit=5`, setRecommendedRecipes);
    }
  };
  useFocusEffect(
    useCallback(() => {
      refreshData();
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
    const fetchRecipeCount = async () => {
      try {
        const skip = Math.floor(Math.random() * 10000);
        getRequest(`recipes?skip=${skip}&limit=5`, (data) => {
          console.log("Recommended Recipes:", data);
          setRecommendedRecipes(data);
        });
      } catch (error) {
        console.error("Error fetching recipe count:", error);
      }
    };

    if (userID) {
      fetchRecipeCount();
    }
  }, [userID]);

  useEffect(() => {
    if (userID) {
      getRequest(`users/${userID}/ingredients`, setMyIngredients);
      getRequest(`users/${userID}/cookers`, setMyCookers);
    }
  }, [userID]);
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"레시피 추천"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3, padding.top(4)]}>오늘의 추천메뉴 </Text>
          <ScrollView style={{ flexDirection: "row" }} horizontal>
            {recommendedRecipes.map((recipe, index) => (
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
            ))}
          </ScrollView>
        </View>

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
        <TouchableOpacity
          style={[
            {
              borderRadius: 10,
              backgroundColor: colors.primary,
              padding: 10,
              marginVertical: 12,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              height: 50,
            },
          ]}
          onPress={() => navigation.navigate("RecommendKitchenState")}
        >
          <Ionicons
            name={"flask"}
            size={25}
            style={{ color: colors.primaryDark, marginRight: 8 }}
          />
          <Text style={[text.sub2, { color: colors.primaryDark }]}>
            레시피 추천받기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
