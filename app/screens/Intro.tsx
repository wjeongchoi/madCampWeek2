import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  align,
  center,
  colors,
  column,
  fill,
  gap,
  justify,
  padding,
  row,
  safe,
  text,
} from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRequest, postRequest } from "../axios";
import { TextInput } from "../components";
import RequestButton from "../components/RequestButton";

export const Intro: React.FC<RootStackScreenProps<"Intro">> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Construct the URL with query parameters
      const loginURL = `users/login?email=${encodeURI(
        email
      )}&password=${encodeURI(password)}`;

      getRequest(
        loginURL,
        async (response) => {
          // Add a log to check the structure of the response
          console.log("Login response:", response);

          const userID = response.userID;
          await AsyncStorage.setItem("userID", userID);
          console.log("Login successful, userID stored");
          navigation.navigate("HomeTab");
        },
        (error) => {
          // Log the error object to understand the nature of the error
          console.error("Login error:", error);
        }
      );
    } catch (error) {
      console.error("Login exception:", error);
    }
  };

  const handleKakaoLogin = () => {
    getRequest(
      "auth/kakao", // Endpoint to get Kakao login URL
      (response) => {
        // Handle the response which contains the Kakao login URL
        const loginUrl = response.url;
        // Navigate to WebViewScreen with the login URL
        navigation.navigate("kakaoLogin", { loginUrl });
      },
      (error) => {
        // Handle any errors here
        console.error("Error fetching Kakao login URL:", error);
      }
    );
  };

  return (
    <View
      style={[
        padding.horizontal(safe.horizontal),
        gap(24),
        justify.center,
        align.center,
        fill,
        center,
      ]}
    >
      <Image
        source={require("../assets/logo2.png")}
        style={{ width: 150, height: 150 }}
      />
      <Text style={[text.h1, justify.center]}>맞춤혼밥</Text>
      <View style={[row, justify.between, gap(8)]}>
        <View style={[column, gap(8), fill]}>
          <TextInput
            value={email}
            options={{ placeholder: "이메일", onChangeText: setEmail }}
          />
          <TextInput
            value={password}
            options={{
              placeholder: "비밀번호",
              onChangeText: setPassword,
              secureTextEntry: true,
            }}
          />
        </View>
        <RequestButton text="로그인" onPress={handleLogin} size={20} style={{ width: 80, height: 80 }} />
      </View>
      <View style={[column, gap(12), align.center]}>
        <TouchableOpacity onPress={handleKakaoLogin}>
          <Image
            source={require("../assets/kakao_login_large_narrow.png")}
            style={{ width: 200, height: 50 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={[text.body2]}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
