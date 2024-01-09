import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import { align, column, justify, padding, safe, text, gap, fill, center } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { postRequest } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "../components";
import RequestButton from "../components/RequestButton";
import { launchImageLibrary } from "react-native-image-picker";

export const SignUp: React.FC<RootStackScreenProps<"SignUp">> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri!);
      }
    });
  };

  
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      //Alert.alert("오류", "비밀번호가 다릅니다");
      return;
    }

    const userID = uuidv4(); // UUID 생성
    const userData = {
      userID: userID,
      email: email,
      name: nickname, // 별명 혹은 이름
      password: password, // 비밀번호 해싱은 백엔드에서 처리
      createdTime: new Date().toISOString().split("T")[0], // 현재 날짜 (YYYY-MM-DD 포맷)
      imgSrc: profileImage, // 프로필 이미지 URL (혹은 기본값 "string")
    };

    postRequest(
      "users/", // API 경로
      userData,
      async (response) => {
        console.log("회원가입 성공:", response.data);
        try {
          await AsyncStorage.setItem("userID", userID);
          console.log("UserID stored successfully");
        } catch (error) {
          console.error("Error storing the userID:", error);
        }
        navigation.navigate("Intro");
      },
      (error) => {
        console.log(email, userID, password, nickname);
        console.error("회원가입 실패:", error);
      }
    );
  };

  return (
    <View style= {[padding.horizontal(safe.horizontal), justify.between,gap(20)]}>
      <View style={[padding.vertical(10)]}>
        <Text style={[text.h1]}>회원가입</Text>
      </View>
      <View style={[column, gap(16)]}>
        <TextInput
            value={email}
            options={{ placeholder: "이메일", onChangeText: setEmail }}
        />
        <TextInput
            value={nickname}
            options={{ placeholder: "닉네임", onChangeText: setNickname }}
        />
        <TextInput
            value={password}
            options={{
            placeholder: "비밀번호",
            onChangeText: setPassword,
            secureTextEntry: true,
            }}
        />
        <TextInput
            value={confirmPassword}
            options={{
            placeholder: "비밀번호 확인",
            onChangeText: setConfirmPassword,
            secureTextEntry: true,
            }}
        />
      </View>
      
      <Button
        title="프로필 사진 업로드"
        onPress={selectImage}
      />
      {profileImage && <Image source={{ uri: profileImage }} style={{ width: 100, height: 100 }} />}


        <RequestButton text="회원가입" onPress={handleSignUp} size={20} />

    </View>
  );
};

function alert(arg0: string) {
  throw new Error(arg0);
}
