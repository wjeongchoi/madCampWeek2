import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, ViewProps } from "react-native";
import {
  align,
  center,
  colors,
  justify,
  padding,
  round,
  text,
} from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Recipe } from "../types";
import EllipticalText from "./EllipticalText";
import placeholderImage from "../assets/logo2.png"; // Import your placeholder image

interface VerticalRecipeProps extends ViewProps {
  recipe: Recipe;
  imgSrc: string;
}

export const VerticalRecipePreview: React.FC<VerticalRecipeProps> = ({
  recipe,
  imgSrc,
  style,
  ...props
}) => {
  const imageSource = imgSrc ? { uri: imgSrc } : placeholderImage;
  const levelText = ["누구나", "초급", "중급", "고급", "상급"];

  return (
    <View
      style={[
        round.md,
        {
          alignItems: "center",
          flexDirection: "column",
          marginHorizontal: 8,
          marginVertical: 8,
          justifyContent: "center",
          backgroundColor: colors.gray50,
        },
        style,
      ]}
    >
      <View style={[center, padding.horizontal(4), padding.vertical(4)]}>
        <Image
          source={imageSource}
          style={{ width: 80, height: 80, borderRadius: 20 }}
        />
        <Text
          style={[text.sub2, { width: 100, textAlign: "center" }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {recipe.title}
        </Text>

        <Text>조리시간:</Text>
        <Text>{String(recipe.cookTime)}분 이내</Text>
        <Text>난이도: {levelText[recipe.level]}</Text>
      </View>
    </View>
  );
};
