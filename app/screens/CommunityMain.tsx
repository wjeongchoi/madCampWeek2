import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { margin, padding, safe, text } from "../styles";
import { HomeTabScreenProps } from "../navigation/types";
import { getRequest } from "../axios";
import { Recipe } from "../types/recipe";
import { AppHeader, ExpandedPreview, RequestButton } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles";

export const CommunityMain: React.FC<HomeTabScreenProps<"Community">> = ({
  navigation,
}) => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRequest(
      "recipes/",
      (response) => {
        // 날짜에 따라 레시피를 내림차순으로 정렬
        const sortedRecipes = [...response].sort(
          (a, b) => new Date(b.writedTime) - new Date(a.writedTime)
        );
        setRecipes(sortedRecipes);
      },
      (error) => {
        console.error("Error fetching recipes data:", error);
      }
    );
  }, []);
  return (
    <View>
      <AppHeader title={"유저 레시피"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <TouchableOpacity
          style={[
            {
              borderRadius: 10,
              backgroundColor: colors.primary,
              padding: 10,
              marginVertical: 16,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              height: 50,
            },
          ]}
          onPress={() => navigation.navigate("UploadRecipe")}
        >
          <Ionicons
            name={"restaurant-sharp"}
            size={25}
            style={{ color: colors.primaryDark, marginRight: 8 }}
          />
          <Text style={[text.sub2, { color: colors.primaryDark }]}>
            내 레시피 등록하기
          </Text>
        </TouchableOpacity>
        <ScrollView
          style={{
            display: "flex",
          }}
        >
          {recipes.map((recipe: Recipe, index) => {
            console.log(recipe.manId);
            return (
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
                <ExpandedPreview recipe={recipe} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
