import React from "react";
import type { ColorValue } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리 import


export const HeaderBackImage =
  (color: ColorValue): React.FC<{ tintColor: string }> =>
  () => <Ionicons width={30} height={30} fill={color} />;