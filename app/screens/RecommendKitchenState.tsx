import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { center, colors, padding, safe, text } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { AppHeader } from "../components";

export const RecommendedKitchenState: React.FC<
  RootStackScreenProps<"MyKitchenState">
> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"레시피 추천"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>재료 추가</Text>
        </View>
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3]}>조리도구 추가</Text>
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
