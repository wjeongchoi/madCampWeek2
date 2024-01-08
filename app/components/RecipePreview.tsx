import React, {useEffect, useState} from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getRequest } from '../axios';
import { margin, text } from '../styles';

export const RecipePreview = ({ title, like, level, cookTime, imgSrc} 
  : {title: String, cookTime: String,like: Number, level: Number, imgSrc : String}) => {
    return (
      <View style={{
        alignItems: 'center', 
        flexDirection: 'row',
        
        margin: 10 }}>
        <Image source={require('../assets/icon.png')}
          style={{ width: 120, height: 120, marginRight: 10  }}/>
        <View style={{
          alignItems: 'center', 
          flexDirection: 'column' }}>
          <Text style={[text.h1]} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
          <Text >조리시간: {cookTime}</Text>
          <Text >좋아요: {String(like)}</Text>
          <Text >난이도: {String(level)}</Text>
        </View>
      </View>
  );
}

