import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../styles';

interface EllipticalTextProps extends TextProps {
  text: string;
  fontSize: number;
  numberOfLines: number
}

export const EllipticalText: React.FC<EllipticalTextProps> = ({ text, fontSize, numberOfLines, style, ...props }) => {
  return (
    <Text style={{ fontSize: fontSize}} numberOfLines={numberOfLines} ellipsizeMode="tail" {...props}>{text}</Text>
  );
};


export default EllipticalText;