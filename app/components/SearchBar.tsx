import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, margin, padding, round, text } from "../styles";
import { getRequest } from '../axios'; // Adjust the import path as needed

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder, value, onPress, onChangeText
}) => {
  return (
    <View>
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
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="search" color={colors.gray500} size={20} />

          </TouchableOpacity>
          
          <TextInput
            style={[margin.left(6), text.btn2, { color: colors.gray500 }, {flex:1}]}
            onChangeText={onChangeText}
            value={value}
            onSubmitEditing={onPress}
            placeholder={placeholder}
          />
        </View>
    </View>
  );
};

export default SearchBar;
