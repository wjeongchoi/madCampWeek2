import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, ViewProps } from "react-native";
import { colors } from "../styles";
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
          margin: 10,
          backgroundColor: colors.gray50,
          borderRadius: 20,
          padding: 5,
        },
        style,
      ]}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "center",
        }}
      >
        <Image
          source={imgPath ? { uri: imgPath } : defaultImage}
          style={{ width: 50, height: 50 ,marginHorizontal: 10, borderRadius: 20}} 
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
            }}
          >
            <EllipticalText
              fontSize={18}
              text={recipe.title}
              numberOfLines={1}
            />
            <View pointerEvents="none">
              {/*             여기만 터치가 안되게 하고 싶은데 적용이 안됨 */}

              <Ionicons
                name="heart"
                color={isLike ? colors.like : colors.gray100}
                size={30}
                onPress={() => {
                  likeToggle;
                }}
              />
            </View>
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
            <Text style={{ fontSize: 12 }}>난이도: {String(recipe.level)}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{ marginHorizontal: 10 }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {recipe.subTitle}
        </Text>
      </View>
    </View>
  );
};
