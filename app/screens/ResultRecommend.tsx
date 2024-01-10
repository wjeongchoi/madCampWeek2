import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { RootStackScreenProps } from "../navigation/types";
import { align, center, colors, padding, row, safe, text } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { getRequest } from "../axios";
import { AppHeader, HorizontalRecipePreview, SearchBar } from "../components";
import { Recipe } from "../types";

export const ResultRecommend: React.FC<
  RootStackScreenProps<"MyKitchenState">
> = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Fetch initial set of recipes or recommendations
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    getRequest(
      "recipes/",
      (response) => {
        setRecipes([...response]);
      },
      (error) => {
        console.error("Error fetching recipes data:", error);
      }
    );
  };

  const handleSearch = () => {
    const encodedRecipeName = encodeURIComponent(searchText);
    console.log("1", searchText);
    console.log("2", encodedRecipeName);
    getRequest(
      `recipes/search/${searchText}`,
      (data) => {
        setRecipes([...data]);
      },
      (error) => {
        console.error("Search error:", error);
      }
    );
    setSearchText("");
  };
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"유저 레시피"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View style={[center, row, padding.vertical(8)]}>
          <Text style={[text.h2]}>당신을 위한 레시피</Text>
          <Image
            source={require("../assets/sparkles.png")}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View style={[padding.vertical(8)]}>
        <SearchBar
          onPress={handleSearch}
          style={{ width: 300}}
          size={20}
          value={searchText}
          placeholder={"키워드로 검색해보세요"}
          onChangeText={(text) => setSearchText(text)} // Handle text change
        />

        </View>
        
        <ScrollView
          style={{
            display: "flex",
            width: Dimensions.get("window").width * 0.9,
          }}
        >
          {recipes.map((recipe: Recipe, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  const recipeId = recipe.recipeID;

                  recipe.manId
                    ? navigation.navigate("ManRecipe", {
                        recipeId: recipeId,
                      } as { recipeId: string })
                    : navigation.navigate("OwnRecipe", {
                        recipeId: recipeId,
                      } as { recipeId: string });
                }}
              >
                <HorizontalRecipePreview
                  recipe={recipe}
                  style={{ backgroundColor: colors.gray100 }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
