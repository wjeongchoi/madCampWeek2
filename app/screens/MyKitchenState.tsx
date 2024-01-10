import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { colors, padding, round, text, gap, safe } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { AppHeader, Tag } from "../components";

export const MyKitchenState: React.FC<
  RootStackScreenProps<"MyKitchenState">
> = () => {
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
      <AppHeader title={"마이페이지"} />
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
                  onDeletePress={() => {
                    console.log("delete");
                  }}
                  size={20}
                  isSelected={false}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={""}
                  canDeleted={true}
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
                  onDeletePress={() => {
                    console.log("delete");
                  }}
                  size={20}
                  isSelected={false}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={""}
                  canDeleted={true}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
