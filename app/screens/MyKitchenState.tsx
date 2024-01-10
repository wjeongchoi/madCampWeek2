import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { colors, padding, round, text, gap, safe } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { AppHeader, Tag } from "../components";
import { postRequest, getRequest, deleteRequest} from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cooker } from "../types/cooker";
import { Ingredient } from "../types/ingredient";

export const MyKitchenState: React.FC<
  RootStackScreenProps<"MyKitchenState">
> = () => {
  const [cookers, setCookers] = useState([]);
  const [cookerInput, setCookerInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("userID");
        if (storedUserID != null) {
          setUserID(storedUserID);
        }
      } catch (e) {
        // error reading value
      }
    };
    fetchUserID();
  }, []);
  
  useEffect(() => {
    getRequest(`users/${userID}/ingredients`, (responseData) => {
      const newIngredients = []
      responseData.map((ingredient : Ingredient) => {
        newIngredients.push(ingredient.ingredientName);
        
      }) 
      setIngredients([...newIngredients]);
    });
    getRequest(`users/${userID}/cookers`, (responseData) => {
      const newCookers = []
      responseData.map((cooker : Cooker) => {
        newCookers.push(cooker.cookerName);
        
      }) 
      setCookers([...newCookers]);
    });
  }, [userID])

  const addCookerTag = (tag: string) => {
    setCookerInput(tag);
    if (tag.includes(" ")) {
      setCookers([...cookers, tag]);
      setCookerInput("");
    }
    const data = {
      "cookerName": tag
    };
    postRequest(`users/${userID}/cooker`, data, (responseData) => {
      console.log(responseData);
    });
  };

  const deleteCookerTag = (index: number) => {
    const cooker : Cooker = cookers[index];
    const newCookers = [...cookers];
    newCookers.splice(index, 1);
    setCookers(newCookers);

    deleteRequest(`users/${userID}/cooker/${cooker}`, (responseData) => {
      console.log(responseData);
    });
  };

  const addIngradiantTag = (tag: string) => {
    setIngredientInput(tag);
    if (tag.includes(" ")) {
      setIngredients([...ingredients, tag]);
      setIngredientInput("");
    }
    const data = {
      "ingredientName": tag
    };
    postRequest(`users/${userID}/ingredients`, data, (responseData) => {
      console.log(responseData);
    }, (error) => {
      console.error(error);
    });
  };

  const deleteIngredientTag = (index: number) => {
    const ingredient : Ingredient = ingredients[index];

    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    deleteRequest(`users/${userID}/ingredient/${ingredient}`, (responseData) => {
      console.log(responseData);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={"마이페이지"} />
      <View style={[padding.horizontal(safe.horizontal)]}>
        <View style={[padding.vertical(8), gap(8)]}>
          <Text style={[text.h3]}>재료 추가</Text>
          <TextInput
            style={[
              { backgroundColor: colors.gray200 },
              { height: 30 },
              round.sm,
              padding.left(8),
            ]}
            placeholder="2가지 이상의 재료는 띄어쓰기로 구분해 주세요"
            value={ingredientInput}
            onChangeText={(text) => addIngradiantTag(text)}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {ingredients.map((ingredient: string, index : number) => {
              return (
                <Tag
                  key={index}
                  onPress={() => {deleteIngredientTag(index)}}
                  value={ingredient}
                  size={20}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={colors.primaryDark}
                  canDeleted
                />
              );
            })}
          </View>
        </View>
        <View style={[padding.vertical(8), gap(8)]}>
          <Text style={[text.h3]}>조리도구 추가</Text>
          <TextInput
            style={[
              { backgroundColor: colors.gray200 },
              { height: 30 },
              round.sm,
              padding.left(8),
            ]}
            placeholder="2가지 이상의 도구는 띄어쓰기로 구분해 주세요"
            value={cookerInput}
            onChangeText={(text) => addCookerTag(text)}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {cookers.map((cooker : string, index : number) => {
              return (
                <Tag
                  key={index}
                  onPress={() => {deleteCookerTag(index)}}
                  value={cooker}
                  size={20}
                  color={colors.primary}
                  style={{ width: 100 }}
                  textColor={colors.primaryDark}
                  canDeleted
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
