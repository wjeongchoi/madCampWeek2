import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteRequest, getRequest } from "../axios";
import {
  column,
  text,
  gap,
  justify,
  align,
  row,
  padding,
  safe,
  colors,
  center,
  margin,
} from "../styles";
import { HomeTabScreenProps } from "../navigation/types";
import { UserData } from "../types/user"; // Assuming Recipe is a type defined in your types
import { Recipe } from "../types/recipe";
import {
  AppHeader,
  RequestButton,
  HorizontalRecipePreview,
} from "../components";
import { VerticalRecipePreview } from "../components/VerticalRecipePreview";
import defaultImage from "../assets/logo2.png"; // Adjust the path as necessary

export const MyPageMain: React.FC<HomeTabScreenProps<"MyPage">> = ({
  navigation,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [likeRecipes, setLikeRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);

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
          getRequest(`users/${userID}/like/recipes`, setLikeRecipes);
          getRequest(`users/${userID}/recipes`, setMyRecipes);
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
        <Text style={[text.h3, justify.start, margin.bottom(8)]}>계정</Text>
        {userData && (
          <>
            <View style={[row, gap(12)]}>
              <Image
                source={
                  userData.imgSrc ? { uri: userData.imgSrc } : defaultImage
                }
                style={{ width: 80, height: 80 }} // Adjust styles as needed
              />
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
        <View style={[row, justify.center, gap(30), padding.vertical(10)]}>
          <TouchableOpacity
            style={[
              {
                borderRadius: 10,
                backgroundColor: colors.primaryLight,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                width: 100,
              },
            ]}
            onPress={handleLogout}
          >
            <Text style={[text.body2]}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                borderRadius: 10,
                backgroundColor: colors.primaryLight,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                width: 100,
              },
            ]}
            onPress={handleUnsubscribe}
          >
            <Text style={[text.body2]}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>

        <RequestButton
          onPress={() => {
            navigation.navigate("MyKitchenState");
          }}
          size={20}
          text="내 재료 확인하기"
          iconName="restaurant-sharp"
          style={{ marginHorizontal: 30 }}
        />
        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3, justify.start]}>좋아요한 레시피</Text>
          <ScrollView style={[row]} horizontal={true}>
            {likeRecipes.length > 0 ? (
              likeRecipes.map((recipe, index) => (
                <TouchableOpacity
                  onPress={() => {
                    recipe.manId
                      ? navigation.navigate("ManRecipe", {
                          recipeId: recipe.recipeID,
                        } as { recipeId: string })
                      : navigation.navigate("OwnRecipe", {
                          recipeId: recipe.recipeID,
                        } as { recipeId: string });
                  }}
                >
                  <VerticalRecipePreview
                    key={index}
                    recipe={recipe}
                    imgSrc={recipe.imgSrc}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[text.btn1, { color: colors.gray400 }]}>
                ! 아직 비어있어요 !
              </Text>
            )}
          </ScrollView>
        </View>

        <View style={[padding.vertical(8)]}>
          <Text style={[text.h3, justify.start]}>내가 올린 레시피</Text>
          {myRecipes.length > 0 ? (
            myRecipes.map((recipe, index) => (
              <HorizontalRecipePreview
                key={index}
                recipe={recipe}
                imgPath={recipe.imgSrc}
              />
            ))
          ) : (
            <Text style={[text.btn1, { color: colors.gray400 }]}>
              ! 아직 비어있어요 !
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
