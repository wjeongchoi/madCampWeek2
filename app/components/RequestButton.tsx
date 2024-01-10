import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

interface CustomButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
  size: number;
  iconName?: string;
}

export const RequestButton: React.FC<CustomButtonProps> = ({ onPress, text, size, iconName, style, ...props }) => {
  return (
    <TouchableOpacity style={[
      {borderRadius: (size * 0.5), 
      backgroundColor: colors.primary,
      padding: (size * 0.5),
      marginVertical: 10,
      justifyContent: 'center',
      flexDirection: 'row', 
      alignItems: 'center'
      }, style]} 
      onPress={onPress} 
      {...props}>
        { iconName && <Ionicons 
                      name={iconName} 
                      size={size} 
                      style={{color: colors.black, marginRight: (size/5)}}/>}
        <Text style={{fontSize: size, color: colors.black}}>{text}</Text>
    </TouchableOpacity>
  );
};


export default RequestButton;