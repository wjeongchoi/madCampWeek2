import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import {
  border,
  center,
  colors,
  gap,
  padding,
  round,
  safe,
  text,
} from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { AppHeader, Tag } from "../components";

export const RecommendedKitchenState: React.FC<
  RootStackScreenProps<"MyKitchenState">
> = ({ navigation }) => {
  const [cookers, setCookers] = useState([]);
  const [cookerInput, setCookerInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const addCookerTag = (tag: string) => {
    setCookerInput(tag);
    if (tag.includes(" ")) {
      setCookers([...cookers, tag]);
      setCookerInput("");
    }
  };

  const addIngradiantTag = (tag: string) => {
    setIngredientInput(tag);
    if (tag.includes(" ")) {
      setIngredients([...ingredients, tag]);
      setIngredientInput("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"레시피 추천"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View style={[padding.vertical(8), gap(8)]}>
          <Text style={[text.h3]}>재료 추가</Text>
          <TextInput
            style={[
              { backgroundColor: colors.gray200 },
              { height: 30 },
              round.sm,
              padding.left(8),
            ]}
            placeholder="2가지 이상의 재료는 띄어쓰기로 구분해 주세요"
            value={ingredientInput}
            onChangeText={(ingredient) => addIngradiantTag(ingredient)}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {ingredients.map((ingredient) => {
              return (
                <Tag
                  onPress={() => {
                    console.log("state changed");
                  }}
                  value={ingredient}
                  size={20}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={""}
                />
              );
            })}
          </View>
        </View>
        <View style={[padding.vertical(8), gap(8)]}>
          <Text style={[text.h3]}>조리도구 추가</Text>
          <TextInput
            style={[
              { backgroundColor: colors.gray200 },
              { height: 30 },
              round.sm,
              padding.left(8),
            ]}
            placeholder="2가지 이상의 도구는 띄어쓰기로 구분해 주세요"
            value={cookerInput}
            onChangeText={(cooker) => addCookerTag(cooker)}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {cookers.map((cooker) => {
              return (
                <Tag
                  onPress={() => {
                    console.log("state changed");
                  }}
                  value={cooker}
                  size={20}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={""}
                />
              );
            })}
          </View>
        </View>
        <View style={[center, padding.vertical(8)]}>
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
                width: 120,
                height: 50,
              },
            ]}
            onPress={() => navigation.navigate("ResultRecommend")}
          >
            <Text style={[text.sub1, { color: colors.primaryDark }]}>
              추천받기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
