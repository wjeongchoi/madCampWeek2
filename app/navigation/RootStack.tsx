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
  WebViewScreen,
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManRecipe" component={ManRecipe} options={{headerShown:false}}/>
          <Stack.Screen name="OwnRecipe" component={OwnRecipe} options={{headerShown:false}}/>
          <Stack.Screen name="MyKitchenState" component={MyKitchenState} options={{headerShown:false}}/>
          <Stack.Screen name="UploadRecipe" component={UploadRecipe} options={{headerShown:false}}/>
          <Stack.Screen name="ResultRecommend" component={ResultRecommend} options={{headerShown:false}}/>
          <Stack.Screen name="RecommendKitchenState" component={RecommendedKitchenState} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="Login" component={Intro} options={{headerShown:false}}/>
          <Stack.Screen name="kakaoLogin" component={WebViewScreen}/>

        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
};
