import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { HomeTabScreenProps } from "../navigation/types";
import { padding, safe, colors } from "../styles";
import { getRequest } from "../axios";
import { Recipe } from "../types";
import { SearchBar, HorizontalRecipePreview, AppHeader } from "../components";

export const SearchMain: React.FC<HomeTabScreenProps<"Search">> = ({
  navigation,
}) => {
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
    console.log('1', searchText);
    console.log('2', encodedRecipeName);
    getRequest(
      `recipes/search?name=${searchText}`,
      (data) => {
        setRecipes([...data]);
      },
      (error) => {
        console.error('Search error:', error);
      }
    );
    setSearchText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"레시피 검색"} />
      <View style={[padding.horizontal(safe.horizontal), padding.top(16)]}>
        <SearchBar
          onPress={handleSearch}
          style={{ width: 300 }}
          size={20}
          value={searchText}
          placeholder={"레시피를 검색해보세요"}
          onChangeText={(text) => setSearchText(text)} // Handle text change
        />

        <ScrollView
          style={{
            display: "flex",
            width: Dimensions.get("window").width * 0.9,
            paddingTop: 16
          }}
        >
          {recipes.map((recipe: Recipe, index) => (
            <TouchableOpacity
              key={index} // Added key for React list rendering
              onPress={() => {
                recipe.manId
                  ? navigation.navigate("ManRecipe", {
                      recipeId: recipe.recipeID,
                    })
                  : navigation.navigate("OwnRecipe", {
                      recipeId: recipe.recipeID,
                    });
              }}
            >
              <HorizontalRecipePreview
                style={{ backgroundColor: colors.gray50 }}
                recipe={recipe}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
