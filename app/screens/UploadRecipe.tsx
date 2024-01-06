import React , {useState} from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { border, colors, text } from '../styles';
import { RootStackScreenProps } from '../navigation/types';
import {postRequest} from "../axios"

export const UploadRecipe: React.FC<RootStackScreenProps<"UploadRecipe">> =({ navigation })=> {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookers, setCookers] = useState([]);
  const [cookerInput, setCookerInput] = useState('');
  const [ingradients, setIngradiants] = useState([]);
  const [ingradientInput, setIngradientInput] = useState('');
  const [level, setLevel] = useState(0);
  const [cookTime, setCookTime] = useState('');

  const addCookerTag = ((tag : string) => {
    setCookerInput(tag)
    if (tag.includes(' ')) {
      setCookers([...cookers, tag])
      setCookerInput('')
     }
  });


  const addIngradiantTag = ((tag : string) => {
    setIngradientInput(tag);
    if (tag.includes(' ')) {
      setIngradiants([...ingradients, tag])
      setIngradientInput('')
     }
  });

  const addRecipe = (() => {
    const sendDate ={ 
      'title': title,
      'subTitle': subTitle,
      'level': level,
      'cookTime': cookTime
    };
    console.log(cookTime, level)
    postRequest('recipes', sendDate, () => {
      //console.log(API_URL+'/recipes')
      navigation.navigate('Home');
      }
    );
    });

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View>
        <Text style={[text.h1]}>레시피 업로드</Text>
        <TextInput
        style={[border.gray100]}
        value={title}
        onChangeText={(tast: string) => setTitle(tast)}
        placeholder="제목을 입력해주세요."/>
      </View>
      <View>
        <TextInput
          style={[border.gray100]}
          value={subTitle}
          onChangeText={(taxt: string) => setSubTitle(taxt)}
          placeholder="부제목을 입력해주세요."/>
      </View>
      <View>
        <Text style={[text.h3] }>요리 부재료 및 도구</Text>
        {/* cookers and ingrandiants */}
        <TextInput
          style={[border.gray100]}
          placeholder='2가지 이상의 도구는 띄어쓰기로 구분해 주세요'
          value={cookerInput}
          onChangeText={(cooker) => addCookerTag(cooker)}/>
        <View style={{ flexDirection: "row", width: 200, height: 40}}>
          {
            cookers.map((cooker) => {
              return (<Button
                title={cooker}/>)
            })
          }
        </View>

        <TextInput
          style={[border.gray100]}
          placeholder='2가지 이상의 재료는 띄어쓰기로 구분해 주세요'
          value={ingradientInput}
          onChangeText={(ingradient) => addIngradiantTag(ingradient)}/>
        <View style={{ flexDirection: "row", width: 200, height: 40}}>
          {
            ingradients.map((ingradient) => {
              return (<Button
                title={ingradient}/>)
            })
          }
        </View>
      
      </View>
      <View>
        {/*DOTO: label이 화면에 표시되지 않는 오류 수정 */}
        <Text style={[text.h3]}>요리 정보</Text>
        <View style={{flexDirection: 'row'}}>
          <Picker
              style={{flex: 1}}
              selectedValue={level}
              onValueChange={(value, index)=>{setLevel(value)}}>
            <Picker.Item label='난이도' value='1' style={{fontSize: 12}}/>
            <Picker.Item label='누구나' value='2' style={{fontSize: 12}}/>
            <Picker.Item label='초급' value='3' style={{fontSize: 12}}/>
            <Picker.Item label='중급' value='4' style={{fontSize: 12}}/>
            <Picker.Item label='상급' value='5' style={{fontSize: 12}}/>
          </Picker>
        </View>
        <Text style={[text.h3]}>소요 시간</Text>
        <View style={{flexDirection: 'row'}}>
          <Picker
              style={{flex: 1, fontSize: 12}}
              selectedValue={cookTime}
              onValueChange={(cookTime, index)=>{setCookTime(cookTime)}}
              >
            <Picker.Item label='5분이내' value="1" style={{fontSize: 12}}/>
            <Picker.Item label='10분이내' value="2" style={{fontSize: 12}}/>
            <Picker.Item label='30분이내' value="3" style={{fontSize: 12}}/>
            <Picker.Item label='60분이내' value="4" style={{fontSize: 12}}/>
            <Picker.Item label='1시간이상' value="5" style={{fontSize: 12}}/>
          </Picker>
        </View>
      </View>
      <Button
        title= '저장하기'
        onPress={addRecipe}/>
    </View>
  );
}