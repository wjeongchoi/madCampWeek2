import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeTab } from "./HomeTab";
import type { RootStackParamList } from "./types";
import {
  OwnRecipe,
  UploadRecipe,
  RecommendedKitchenState,
  ResultRecommend,
  MyKitchenState,
  ManRecipe,
  Intro,
  SignUp,
} from "../screens";
import { center, colors, fill } from "../styles";
import { HeaderBackImage } from "./Header";
import { AppTheme } from "../theme";

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack: React.FC = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <React.Suspense
        fallback={
          <View style={[fill, center]}>
            <Text>Loading...</Text>
          </View>
        }
      >
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManRecipe" component={ManRecipe}/>
          <Stack.Screen name="OwnRecipe" component={OwnRecipe}/>
          <Stack.Screen name="MyKitchenState" component={MyKitchenState}/>
          <Stack.Screen name="UploadRecipe" component={UploadRecipe}/>
          <Stack.Screen name="ResultRecommend" component={ResultRecommend}/>
          <Stack.Screen name="RecommendKitchenState" component={RecommendedKitchenState}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="Intro" component={Intro}/>

        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
};
