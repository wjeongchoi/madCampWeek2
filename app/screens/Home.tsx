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
                <VerticalRecipePreview
                  key={index}
                  recipe={recipe}
                  imgSrc={recipe.imgSrc}
                />
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
