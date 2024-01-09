import { Text, View } from "react-native";
import { colors, text } from "../styles";

type AppHeaderProps = {
  title: string; // 타이틀을 위한 props
};

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
    <View
      style={{ backgroundColor: colors.primary, height: 120, width: "100%", justifyContent:"center" }}
    >
      <Text style={[text.h2, {paddingLeft: 24}, {paddingTop:50}, {color: colors.primaryDark}]}>{title}</Text>
    </View>
  );
};
