import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRequest } from "../axios";
import { AppHeader, Tag } from "../components";
import { colors, column, gap, padding, row, safe, text } from "../styles";
import { VerticalRecipePreview } from "../components/VerticalRecipePreview";

export const Home: React.FC<HomeTabScreenProps<"Home">> = ({ navigation }) => {
  const [userID, setUserID] = useState("");
  const [myIngredients, setMyIngredients] = useState([]);
  const [myCookers, setMyCookers] = useState([]);
  const [likeRecipes, setLikeRecipes] = useState([]);

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
      <View style={[padding.horizontal(safe.horizontal), column]}>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>내 재료</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {myIngredients.map((ingredient, index) => (
              <Tag
                key={index}
                value={ingredient.ingredientName}
                size={14}
                color={colors.primary}
                textColor={colors.black}
                style={{ margin: 5 }} // You can adjust margin if needed
              />
            ))}
          </View>
        </View>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>내 조리도구</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {myCookers.map((cooker, index) => (
              <Tag
                key={index}
                value={cooker.cookerName}
                size={14}
                color={colors.primary}
                textColor={colors.primaryDark}
                style={{ margin: 5 }} // Add some margin around each tag
              />
            ))}
          </View>
        </View>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>좋아요한 레시피</Text>
          <ScrollView style={[row]} horizontal={true}>
            {likeRecipes.map((recipe, index) => (
              <VerticalRecipePreview
                key={index}
                recipe={recipe}
                imgSrc={recipe.imgSrc}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
