import React from "react";
import { View, Text, Button } from "react-native";
import { text } from "../styles";
import { RootStackScreenProps } from "../navigation/types";

export const RecommendedKitchenState: React.FC<RootStackScreenProps<"MyKitchenState">> =({ navigation })=> {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={[text.sub1]}>추천 전 주방 상태</Text>
      <Text style={[text.body1]}>재료 조리도구 수정</Text>
      <Button
        title="추천받기"
        onPress={() => navigation.navigate("ResultRecommend")}
      ></Button>
    </View>
  );
};
