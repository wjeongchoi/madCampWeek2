import React, {useState} from 'react';
import { View, Text, Image, ViewProps  } from 'react-native';
import { colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../types';

interface HoriziontalRecipeProps extends ViewProps {
  recipe: Recipe,
  imgPath: string
}

export const HoriziontalRecipePreview : React.FC<HoriziontalRecipeProps> = ({ recipe, imgPath, style, ...props }) => {
    const [isLike, setIsLike] = useState(false);
    const likeToggle = () => {
      setIsLike(!isLike);
      // 좋아요 했는지 안했는지 받기
      // 
    }
    const levelText = ['누구나', '초급', '중급', '고급', '상급'];
    return (
      <View style={[{
        borderRadius: 20,
        padding: 5,
        alignItems: 'center', 
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10}, style]}
        >
        <Image source={{uri: imgPath}} 
              style={{ width: 50, height: 50, marginHorizontal: 10, borderRadius: 20}} />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          marginRight: 10 }}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{flex: 4, fontSize: 16}} numberOfLines={1} ellipsizeMode="tail">{recipe.title}</Text>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}} pointerEvents="none"> 
{/*             {/* 여기만 터치가 안되게 하고 싶은데 적용이 안됨 */}
              <Text style={{justifyContent:"flex-end",
                  fontSize: 12,
                  color: colors.gray500,
                  alignItems: 'center',
                  marginRight: 5}}> {String(recipe.like)}</Text>
              <Ionicons name="heart" color={isLike ? colors.red400 : colors.gray100} size={15} 
                onPress={() => {likeToggle}}/>
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