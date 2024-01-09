import React from 'react';
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

interface SearchBarProps extends TouchableOpacityProps{
  onPress: () => void;
  onChangeText: () => void;
  value: string;
  size: number;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onPress, onChangeText, value, size, placeholder, style, ...props }) => {
  return (
    <View style={[{backgroundColor: colors.gray200,
            borderRadius: size,
            padding: (size * 0.5),
            alignItems: 'center',
            
            flexDirection: "row"}, style]}>
        <TouchableOpacity onPress={onPress}>
            <Ionicons name="search" color={colors.gray500} size={size} />
        </TouchableOpacity>
        <TextInput
            keyboardType="web-search"
            onChangeText={onChangeText}
            placeholder={placeholder ? "검색ㄱ" : placeholder}
            value={value}
            style={{fontSize: (size * 0.7), marginLeft: (size * 0.3)}}/>  
    </View>
  );
};


export default SearchBar;