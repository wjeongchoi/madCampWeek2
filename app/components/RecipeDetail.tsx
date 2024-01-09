import React from 'react';
import { View, Text, Image, ViewProps  } from 'react-native';
import { colors } from '../styles';
import { DetailRecipe } from '../types/detailRecipe';


interface RecipeDetailProps extends ViewProps {
  detailRecipe: DetailRecipe,
}

export const RecipeDetail : React.FC<RecipeDetailProps> = ({ detailRecipe, style, ...props }) => {
    return (
      <View style={[{
        borderRadius: 20,
        padding: 5,
        alignItems: 'center', 
        flexDirection: 'row',
        display: 'flex',
        width: 300,
        backgroundColor: colors.gray50,
        justifyContent: 'space-around',
        margin: 10}, style]}
        >
        <Text style={{fontSize: 30, textAlign: 'center'}}>{detailRecipe.order}</Text>
        <Text style={{fontSize: 16}}>{detailRecipe.description}</Text>
        <Image source={{uri: detailRecipe.imgSrc}} style={{width: 50, height: 50, borderRadius: 10}}/>
      </View>
  );
}