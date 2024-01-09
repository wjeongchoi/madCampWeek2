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
import { text } from "../styles";
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
        setRecipes([...response]);
      },
      (error) => {
        console.error("Error fetching recipes data:", error);
      }
    );
  }, []);
  return (
    <View>
      <AppHeader title={"유저 레시피"} />
      <View style={{ marginTop: 30, marginLeft: 10 }}>

        <RequestButton
          onPress={() => {
            navigation.navigate("UploadRecipe");
          }}
          size={20}
          text="내 레시피 등록하기"
          iconName="restaurant-sharp"
          style={{ marginHorizontal: 30 }}
        />

        <SafeAreaView style={{ marginTop: 10 }}>
          <ScrollView
            style={{
              display: "flex",
              width: Dimensions.get("window").width * 0.9,
            }}
          >
            {recipes.map((recipe: Recipe, index) => {
              console.log(recipe.manId);
              return (
                <TouchableOpacity
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
                  <ExpandedPreview
                    recipe={recipe}
                    imgPath={
                      "https://podicmaster.cdn3.cafe24.com/artworks/0094.png"
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};
