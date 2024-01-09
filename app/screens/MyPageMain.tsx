import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteRequest, getRequest } from "../axios";
import { column, text, gap, justify, align, row, padding, safe } from "../styles";
import { HomeTabScreenProps } from "../navigation/types";
import { UserData } from "../types/user";
import { AppHeader, RequestButton } from "../components";
import { ScrollView } from "react-native-gesture-handler";

export const MyPageMain: React.FC<HomeTabScreenProps<"MyPage">> = ({
  navigation,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleUnsubscribe = () => {
    Alert.alert(
      "회원탈퇴 확인", // Title of the alert
      "정말 탈퇴하시겠습니까?", // Message in the alert
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Unsubscribe"),
          style: "cancel",
        },
        { text: "확인", onPress: () => unsubscribeUser() },
      ]
    );
  };

  const unsubscribeUser = async () => {
    const userID = await AsyncStorage.getItem("userID");
    if (userID) {
      deleteRequest(
        `users/${userID}`,
        (response) => {
          console.log("Unsubscribed successfully:", response);
          navigation.navigate("Login"); // Navigate to Intro screen
        },
        (error) => {
          console.error("Error during unsubscribe:", error);
        }
      );
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userID"); // Remove userID from AsyncStorage
      navigation.navigate("Login"); // Navigate to Intro screen
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = await AsyncStorage.getItem("userID");
        console.log("UserID from AsyncStorage:", userID); // Ensure UserID is retrieved

        if (userID) {
          getRequest(
            `users/${userID}`,
            (response) => {
              console.log("API Response:", response); // Log the API response
              setUserData(response); // Set the user data
              console.log("Set UserData:", response); // Log the data being set
            },
            (error) => {
              console.error("Error fetching user data:", error);
            }
          );
        }
      } catch (error) {
        console.error("Error retrieving userID:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log("Current UserData State:", userData); // Log the current state

  return (
    <View style={{ flex: 1, gap: 12 }}>
      <AppHeader title={"마이페이지"} />
      <ScrollView style={[padding.horizontal(safe.horizontal), gap(16)]}>
        <Text style={[text.h3, justify.start]}>계정</Text>
        {userData && (
          <>
            <View style={[row, gap(12)]}>
              {userData.imgSrc && (
                <Image
                  source={{ uri: userData.imgSrc }}
                  style={{ width: 100, height: 100 }}
                />
              )}
              <View style={[column, justify.between, align.start]}>
                <Text style={[text.body1]}>이메일: {userData.email}</Text>
                <Text style={[text.body1]}>이름: {userData.name}</Text>
                <Text style={[text.body1]}>
                  가입 날짜: {userData.createdTime}
                </Text>
              </View>
            </View>
          </>
        )}
        <Button title="로그아웃" onPress={handleLogout} />
        <Button title="회원탈퇴" onPress={handleUnsubscribe} />
        <RequestButton
          onPress={() => {
            navigation.navigate("MyKitchenState");
          }}
          size={20}
          text="내 재료 확인하기"
          iconName="restaurant-sharp"
          style={{ marginHorizontal: 30 }}
        />
        <Text style={[text.h3, justify.start]}>좋아요한 레시피</Text>

        <Text style={[text.h3, justify.start]}>내가 올린 레시피</Text>
      </ScrollView>
    </View>
  );
};
