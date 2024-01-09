import React, {useState} from 'react';
import { TouchableOpacityProps, TouchableOpacity, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

interface TagProps extends TouchableOpacityProps{
  onPress: () => void;
  onDeletePress: () => void;
  value: string;
  size: number;
  isSelected: boolean;
  color: string;
}

export const Tag: React.FC<TagProps> = ({ onPress, onDeletePress, value, size, isSelected, color, style, ...props }) => {
    
    return (
    <TouchableOpacity onPress={onPress} 
    style={[{}, style]}>
        <View style={{borderWidth: 2,
        flexDirection: 'row', 
        borderRadius: (size * 0.8),
        borderColor: color,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex'
         }}>
            <Text style={{flex: 1, fontSize: size, color: color, alignContent: 'center'}}>{value}</Text>
            <Ionicons name="close-circle-sharp"  size={size} style={{color: color}} onPress={() => {onDeletePress}}/>
        </View>
    </TouchableOpacity>
  );
};


export default Tag;