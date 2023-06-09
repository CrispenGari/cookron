import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AppParamList = {
  Landing: undefined;
  Home: undefined;
  Settings: undefined;
  Favorites: undefined;
  Recipe: {
    recipe: string;
  };
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
