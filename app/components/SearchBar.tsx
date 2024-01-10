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
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    getRequest(
      `search?name=${searchValue}`,
      (data) => {
        console.log('Search results:', data);
        // Handle the search results as needed
      },
      (error) => {
        console.error('Search error:', error);
      }
    );
  };

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
          <Ionicons name="search" color={colors.gray500} size={20} />
          <TextInput
            style={[margin.left(6), text.btn2, { color: colors.gray500 }, {flex:1}]}
            onChangeText={setSearchValue}
            value={searchValue}
            placeholder={placeholder || '레시피를 검색해보세요'}
          />
        </View>
    </View>
  );
};

export default SearchBar;
