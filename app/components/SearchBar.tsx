import React from "react";
import {
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { colors, margin, padding, round, text } from "../styles";

interface SearchBarProps extends TouchableOpacityProps {
  onPress: () => void;
  onChangeText: () => void;
  value: string;
  size: number;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onPress,
  onChangeText,
  value,
  size,
  placeholder,
  style,
  ...props
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onPress;
        }}
      >
        <View
          style={[
            round.md,
            {
              backgroundColor: colors.gray200,

              padding: 10,
              alignItems: "center",

              flexDirection: "row",
            },
          ]}
        >
          <Ionicons name="search" color={colors.gray500} size={20} />
          <Text style={[margin.left(6), text.btn2, { color: colors.gray500 }]}>
            레시피를 검색해보세요
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
