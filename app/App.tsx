import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리 import

import SearchMain from "./screens/SearchMain";
import RecommMain from "./screens/RecommMain";
import Home from "./screens/Home";
import CommunityMain from "./screens/CommunityMain";
import MyPageMain from "./screens/MyPageMain";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen 
          name="검색" 
          component={SearchMain} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="추천" 
          component={RecommMain} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-flask" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="홈"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="커뮤니티"
          component={CommunityMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-people" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPageMain}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-person-sharp" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}