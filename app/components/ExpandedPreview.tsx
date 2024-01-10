import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, ViewProps } from "react-native";
import { align, colors, justify, text } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Recipe } from "../types";
import { EllipticalText } from "./EllipticalText";
import defaultImage from "../assets/logo2.png"; // Adjust the path as necessary

interface ExpandedPreviewProps extends ViewProps {
  recipe: Recipe;
  imgPath: string;
}

export const ExpandedPreview: React.FC<ExpandedPreviewProps> = ({
  recipe,
  imgPath,
  style,
  ...props
}) => {
  const [isLike, setIsLike] = useState(false);
  const levelText = ["누구나", "초급", "중급", "고급", "상급"];

  const likeToggle = () => {
    setIsLike(!isLike);
    // 좋아요 했는지 안했는지 받기
    //
  };
  return (
    <View
      style={[
        {
          flexDirection: "column",
          backgroundColor: colors.gray50,
          borderRadius: 20,
          padding: 5,
          marginVertical: 8,
        },
        style,
      ]}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginVertical: 5,
          justifyContent: "center",
        }}
      >
        <Image
          source={imgPath ? { uri: imgPath } : defaultImage}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 10,
            borderRadius: 20,
          }}
        />

        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginRight: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:"center",
              paddingBottom: 4
            }}
          >
            <Text style={[text.sub1]} numberOfLines={1} ellipsizeMode="tail">
              {recipe.title}
            </Text>

            <Ionicons
              name="heart"
              color={isLike ? colors.like : colors.gray100}
              size={30}
              onPress={() => {
                likeToggle;
              }}
              style={{paddingBottom: 4}}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 12 }}>
              조리시간: {String(recipe.cookTime)}분 이내
            </Text>
            <Text style={{ fontSize: 12 }}>
              난이도: {levelText[recipe.level]}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{ marginHorizontal: 10, paddingBottom: 10 }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {recipe.subTitle}
        </Text>
      </View>
    </View>
  );
};
