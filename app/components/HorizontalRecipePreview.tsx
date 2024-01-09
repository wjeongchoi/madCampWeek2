import React, { useState } from 'react';
import { View, Text, Image, ViewProps } from 'react-native';
import { colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../types';
import placeholderImage from '../assets/logo2.png'; // Import your placeholder image

interface HorizontalRecipeProps extends ViewProps {
  recipe: Recipe,
  imgPath?: string
}

export const HorizontalRecipePreview: React.FC<HorizontalRecipeProps> = ({ recipe, imgPath, style, ...props }) => {
  const [isLike, setIsLike] = useState(false);
  const likeToggle = () => {
    setIsLike(!isLike);
    // Additional functionality for liking the recipe
  }

  const levelText = ['누구나', '초급', '중급', '고급', '상급'];

  // Use the provided image path or fallback to the placeholder
  const imageSource = imgPath ? { uri: imgPath } : placeholderImage;

  return (
    <View style={[{
      borderRadius: 20,
      padding: 5,
      alignItems: 'center', 
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 10}, style]}
    >
      <Image source={imageSource}
        style={{ width: 50, height: 50, marginHorizontal: 10, borderRadius: 20}} />
      <View style={{
        flex: 1,
        flexDirection: 'column',
        marginRight: 10 }}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{flex: 4, fontSize: 16}} numberOfLines={1} ellipsizeMode="tail">{recipe.title}</Text>
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}} pointerEvents="none">
            <Text style={{
              justifyContent:"flex-end",
              fontSize: 12,
              color: colors.gray500,
              alignItems: 'center',
              marginRight: 5}}> {String(recipe.like)}</Text>
            <Ionicons name="heart" color={isLike ? colors.red400 : colors.gray100} size={15} 
              onPress={likeToggle}/>
          </View>
        </View>
        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 12}}>조리시간: {String(recipe.cookTime)}분 이내</Text>
          <Text style={{fontSize: 12}}>난이도: {levelText[recipe.level]}</Text>
        </View>
      </View>
    </View>
  );
}
