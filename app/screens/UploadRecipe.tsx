import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { border, colors, padding, safe, text } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { postRequest } from "../axios";
import { AppHeader, Tag } from "../components";

export const UploadRecipe: React.FC<RootStackScreenProps<"UploadRecipe">> = ({
  navigation,
}) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [cookers, setCookers] = useState([]);
  const [cookerInput, setCookerInput] = useState("");
  const [ingradients, setIngradiants] = useState([]);
  const [ingradientInput, setIngradientInput] = useState("");
  const [level, setLevel] = useState(1);
  const [cookTime, setCookTime] = useState(1);

  const addCookerTag = (tag: string) => {
    setCookerInput(tag);
    if (tag.includes(" ")) {
      setCookers([...cookers, tag]);
      setCookerInput("");
    }
  };

  const addIngradiantTag = (tag: string) => {
    setIngradientInput(tag);
    if (tag.includes(" ")) {
      setIngradiants([...ingradients, tag]);
      setIngradientInput("");
    }
  };

  const addRecipe = () => {
    const sendDate = {
      title: title,
      subTitle: subTitle,
      level: level,
      cookTime: cookTime,
    };
    console.log("titie", title, subTitle);
    console.log(cookTime, level);
    postRequest("recipes", sendDate, () => {
      //console.log(API_URL+'/recipes')
      navigation.navigate("HomeTab");
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"유저 레시피"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View>
          <Text style={[text.h1]}>레시피 업로드</Text>
          <TextInput
            style={[
              { height: 70, fontSize: 30, margin: 20, borderRadius: 20 },
              border.gray100,
            ]}
            value={title}
            onChangeText={(tast: string) => setTitle(tast)}
            placeholder="제목을 입력해주세요."
          />
        </View>
        <View>
          <TextInput
            style={[border.gray100]}
            value={subTitle}
            onChangeText={(taxt: string) => setSubTitle(taxt)}
            placeholder="설명을 입력해주세요."
          />
        </View>
        <View>
          <Text style={[text.h2]}>요리 부재료 및 도구</Text>
          {/* cookers and ingrandiants */}
          <Text style={[text.h3]}>재료추가</Text>
          <TextInput
            style={[border.gray100]}
            placeholder="2가지 이상의 도구는 띄어쓰기로 구분해 주세요"
            value={cookerInput}
            onChangeText={(cooker) => addCookerTag(cooker)}
          />
          <View style={{ flexDirection: "row", width: 200, height: 40 }}>
            {cookers.map((cooker) => {
              return (
                <Tag
                  onPress={() => {
                    console.log("state changed");
                  }}
                  value={cooker}
                  onDeletePress={() => {
                    console.log("delete");
                  }}
                  size={20}
                  isSelected={false}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={""}
                />
              );
            })}
          </View>
          <Text style={[text.h3]}>재료추가</Text>
          <TextInput
            style={[border.gray100]}
            placeholder="2가지 이상의 재료는 띄어쓰기로 구분해 주세요"
            value={ingradientInput}
            onChangeText={(ingradient) => addIngradiantTag(ingradient)}
          />
          <View style={{ flexDirection: "row", width: 200, height: 40 }}>
            {ingradients.map((ingradient) => {
              return (
                <Tag
                  onPress={() => {
                    console.log("state changed");
                  }}
                  value={ingradient}
                  onDeletePress={() => {
                    console.log("delete");
                  }}
                  size={20}
                  isSelected={false}
                  color={colors.primary}
                  style={{ width: 100 }}
                />
              );
            })}
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          {/*DOTO: label이 화면에 표시되지 않는 오류 수정 */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <View style={{ flexDirection: "column", marginRight: 50 }}>
              <Text style={[text.h3]}>난이도</Text>
              <Picker
                style={{ width: 150 }}
                selectedValue={level}
                onValueChange={(value, index) => {
                  setLevel(value);
                }}
              >
                <Picker.Item
                  label="누구나"
                  value="1"
                  style={{ fontSize: 12 }}
                />
                <Picker.Item label="초급" value="2" style={{ fontSize: 12 }} />
                <Picker.Item label="중급" value="3" style={{ fontSize: 12 }} />
                <Picker.Item label="상급" value="4" style={{ fontSize: 12 }} />
              </Picker>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={[text.h3]}>소요 시간</Text>
              <Picker
                style={{ flex: 1, fontSize: 12, width: 150 }}
                selectedValue={cookTime}
                onValueChange={(cookTime, index) => {
                  setCookTime(cookTime);
                }}
              >
                <Picker.Item
                  label="5분이내"
                  value="1"
                  style={{ fontSize: 12 }}
                />
                <Picker.Item
                  label="10분이내"
                  value="2"
                  style={{ fontSize: 12 }}
                />
                <Picker.Item
                  label="30분이내"
                  value="3"
                  style={{ fontSize: 12 }}
                />
                <Picker.Item
                  label="70분이내"
                  value="4"
                  style={{ fontSize: 12 }}
                />
                <Picker.Item
                  label="1시간이상"
                  value="5"
                  style={{ fontSize: 12 }}
                />
              </Picker>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            {
              borderRadius: 10,
              backgroundColor: colors.primary,
              padding: 10,
              marginVertical: 10,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              height: 50,
            },
          ]}
          onPress={addRecipe}
        >
          <Text style={[text.sub1, { color: colors.primaryDark }]}>
            저장하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
