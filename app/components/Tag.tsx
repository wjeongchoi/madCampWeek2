import React, { useState } from "react";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles";
import { text } from "stream/consumers";

interface TagProps extends TouchableOpacityProps {
  onPress?: () => void;
  onDeletePress?: () => void;
  canDeleted?: boolean;
  value?: string;
  size: number;
  isSelected?: boolean;
  color: string;
  textColor: string;
}

export const Tag: React.FC<TagProps> = ({
  onPress,
  onDeletePress,
  value,
  canDeleted,
  size,
  isSelected,
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
          backgroundColor: isSelected ? textColor : color,
          paddingHorizontal: 10, // Increased horizontal padding
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          height: 30
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: isSelected ? color : textColor,
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
            onPress={() => {
              onDeletePress;
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
