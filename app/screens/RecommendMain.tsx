import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { colors, padding, safe, text } from "../styles";
import { HomeTabScreenProps } from "../navigation/types";
import { AppHeader, Tag } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { getRequest } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RecommendMain: React.FC<HomeTabScreenProps<"Recommend">> = ({
  navigation,
}) => {
  const [userID, setUserID] = useState("");
  const [myIngredients, setMyIngredients] = useState([]);
  const [myCookers, setMyCookers] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);


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
      getRequest(`recipes/recommend`, setRecommendedRecipes, (error) => {
        console.error("Error fetching recommended recipes:", error);
    });
    }
  }, [userID]);
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"레시피 추천"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>오늘의 추천메뉴 </Text>

        </View>

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
        <TouchableOpacity
          style={[
            {
              borderRadius: 10,
              backgroundColor: colors.primary,
              padding: 10,
              marginVertical: 10,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              height: 60,
            },
          ]}
          onPress={() => navigation.navigate("RecommendKitchenState")}
        >
          <Ionicons
            name={"flask"}
            size={30}
            style={{ color: colors.primaryDark, marginRight: 8 }}
          />
          <Text style={[text.sub1, { color: colors.primaryDark }]}>
            레시피 추천받기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
