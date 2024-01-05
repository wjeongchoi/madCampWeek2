import React from 'react';
import { View, Text, Button } from 'react-native';
import { text } from '../styles';
import { HomeTabScreenProps } from '../navigation/types';

export const CommunityMain:  React.FC<HomeTabScreenProps<"Community">> = ({ navigation })=> {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[text.h2]}>커뮤니티</Text>
      <Button
        title= '레시피 올리기'
        onPress={() => navigation.navigate('UploadRecipe')}
      ></Button>
      <Button
        title= '만개의 레시피'
        onPress={() => navigation.navigate('ManRecipe')}
      >
      </Button>
      <Button
        title= '자체 레시피'
        onPress={() => navigation.navigate('OwnRecipe')}
      ></Button>
    </View>
  );
}
