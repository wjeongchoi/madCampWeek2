import React, { useState } from "react";
import { View, Text, Image, ViewProps } from "react-native";
import { colors, gap, justify, padding, row, text } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Recipe } from "../types";
import placeholderImage from "../assets/logo2.png"; // Import your placeholder image

interface HorizontalRecipeProps extends ViewProps {
  recipe: Recipe;
  imgPath?: string;
}

export const HorizontalRecipePreview: React.FC<HorizontalRecipeProps> = ({
  recipe,
  imgPath,
  style,
  ...props
}) => {
  const [isLike, setIsLike] = useState(false);
  const likeToggle = () => {
    setIsLike(!isLike);
    // Additional functionality for liking the recipe
  };

  const levelText = ["누구나", "초급", "중급", "고급", "상급"];

  // Use the provided image path or fallback to the placeholder
  const imageSource = imgPath ? { uri: imgPath } : placeholderImage;

  return (
    <View
      style={[
        {
          borderRadius: 20,
          padding: 5,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical:8,
          marginRight:10,
          paddingVertical:8
        },
        style,
      ]}
    >
      <Image
        source={imageSource}
        style={{
          width: 50,
          height: 50,
          marginHorizontal: 10,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginRight: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

          }}
        >
          <Text
            style={[text.sub2, padding.bottom(4)]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {recipe.title}
          </Text>
        </View>
        <View
          style={[row, justify.start, gap(16)]}
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
  );
};
