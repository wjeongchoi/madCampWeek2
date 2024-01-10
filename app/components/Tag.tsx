import React, { useState } from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles";

interface TagProps extends TouchableOpacityProps {
  onPress?: () => void;
  canDeleted?: boolean;
  value?: string;
  size: number;
  color: string;
  textColor: string;
}

export const Tag: React.FC<TagProps> = ({
  onPress,
  value,
  canDeleted,
  size,
  color,
  textColor,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{}, style]}>
      <View
        style={{
          flexDirection: "row",
          borderRadius: size * 0.8,
          backgroundColor: colors.primary,
          paddingHorizontal: 10, // Increased horizontal padding
          justifyContent: 'space-evenly',
          alignItems: "center",
          display: "flex",
          height: 30
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: textColor,
            alignContent: "center",
          }}
        >
          {value}
        </Text>
        {canDeleted && (
          <Ionicons
            name="close-circle-sharp"
            size={size}
            style={{ color: colors.primaryDark}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
