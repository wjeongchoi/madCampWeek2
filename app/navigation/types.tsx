import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

export type HomeTabParamList = {
  Home: undefined;
  Search: undefined;
  MyPage: undefined;
  Recommend: undefined;
  Community: undefined;
};

export type RootStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  ManRecipe: undefined;
  OwnRecipe: undefined;
  RecommendKitchenState: undefined;
  UploadRecipe: undefined;
  ResultRecommend: undefined;
  MyKitchenState: undefined;
  Intro: undefined;
  SignUp: undefined;
  WebViewScreen: { loginUrl: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}