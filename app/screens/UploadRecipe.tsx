import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { border, colors, padding, safe, text } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { postRequest } from "../axios";
import { AppHeader, Tag, RequestButton} from "../components";

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
      if(tag == '')
        return
      setCookers([...cookers, tag]);
      setCookerInput("");
    }
  };

  const addIngradiantTag = (tag: string) => {
    setIngradientInput(tag);
    if (tag.includes(" ")) {
      if(tag == '')
        return
      setIngradiants([...ingradients, tag]);
      setIngradientInput("");
    }
  };

  const addRecipe = () => {
    const sendData = {
      title: title,
      subTitle: subTitle,
      level: level,
      cookTime: cookTime,
    };
    postRequest("recipes/", sendData, (responseData) => {
      navigation.navigate("HomeTab");
    }, (error) => {
      console.error(error);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"유저 레시피"} />
      <ScrollView style={[padding.horizontal(safe.horizontal)]}>
        <View>
          <Text style={[text.h1]}>레시피 업로드</Text>
          <TextInput
            style={[
              { height: 70, fontSize: 28, margin: 10, padding: 10, borderRadius: 20 },
              border.gray100,
            ]}
            value={title}
            onChangeText={(tast: string) => setTitle(tast)}
            placeholder="제목을 입력해주세요."
          />
        </View>
        <View>
          <TextInput
            style={[{height: 40, fontSize: 18, margin: 10, padding: 5, borderRadius: 10}, border.gray100]}
            value={subTitle}
            onChangeText={(taxt: string) => setSubTitle(taxt)}
            placeholder="설명을 입력해주세요."
          />
        </View>
        <View >
          <Text style={[text.h2]}>요리 부재료 및 도구</Text>
          <Text style={[{marginTop: 20}, text.sub1]}>조리 도구 추가</Text>
          <TextInput
            style={[border.gray100]}
            placeholder="2가지 이상의 도구는 띄어쓰기로 구분해 주세요"
            value={cookerInput}
            onChangeText={(cooker) => addCookerTag(cooker)}
          />
          <View style={{ flexDirection: "row", flexWrap: 'wrap', height: 40}}>
            {cookers.map((cooker, index) => {
              return (
                <Tag
                  onPress={() => {
                    const newCookers = [...cookers];
                    newCookers.splice(index, 1);
                    setCookers(newCookers);
                  }}
                  value={cooker}
                  size={20}
                  color={colors.primary}
                  style={{marginHorizontal: 5 }}
                  textColor={colors.primaryDark}
                  canDeleted
                />
              );
            })}
          </View>
          <Text style={[text.sub1]}>재료 추가</Text>
          <TextInput
            style={[border.gray100]}
            placeholder="2가지 이상의 재료는 띄어쓰기로 구분해 주세요"
            value={ingradientInput}
            onChangeText={(ingradient) => addIngradiantTag(ingradient)}
          />
          <View style={{ flexDirection: "row", flexWrap: 'wrap', width: 700, height: 40 }}>
            {ingradients.map((ingradient, index) => {
              return (
                <Tag
                onPress={() => {
                  const newIngredient = [...ingradients];
                  newIngredient.splice(index, 1);
                  setIngradiants(newIngredient);
                }}
                  value={ingradient}
                  size={20}
                  color={colors.primary}
                  textColor={colors.primaryDark}
                  style={{marginHorizontal: 5 }}
                  canDeleted
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
                  label="60분이내"
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
        <View style={{alignItems: 'center'}}>
        <RequestButton 
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
          text={'저장하기'}
          size={20}
          onPress={addRecipe}/> 
        </View>
        
      </ScrollView>
    </View>
  );
};
