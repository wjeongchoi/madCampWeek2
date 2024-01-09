import React, {useEffect, useState} from 'react';
import { View, Text, Button, Image, ViewProps  } from 'react-native';
import { colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../types';
import EllipticalText from './EllipticalText';

interface VerticalRecipeProps extends ViewProps {
    recipe: Recipe,
    imgSrc: string
}


export const VerticalRecipePreview : React.FC<VerticalRecipeProps> = ({ recipe, imgSrc, style, ...props }) => {
    const imgsrc = require(imgSrc);
    return (
      <View style={[{
        alignItems: 'center', 
        flexDirection: 'column',
        margin: 10 }, style]}
        >
          <Image source={imgsrc}
            style={{ width: 80, height: 80, marginRight: 10, borderRadius: 20}} />
        <EllipticalText fontSize={20} style={{ width: 100}} numberOfLines={1} text={recipe.title} />
        <Text >조리시간: {String(recipe.cookTime)}분 이내</Text>
        <Text >난이도: {String(recipe.level)}</Text>

      </View>
  );
}