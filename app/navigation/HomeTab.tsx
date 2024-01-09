import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리 import

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import type { HomeTabParamList } from "./types";
import { bg, colors, padding, text } from "../styles";
import {
  CommunityMain,
  Home,
  MyPageMain,
  RecommendMain,
  SearchMain,
} from "../screens";

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTab: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen 
          name="Search" 
          component={SearchMain} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size}/>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Recommend" 
          component={RecommendMain} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-flask" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-people" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person-sharp" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    )
}