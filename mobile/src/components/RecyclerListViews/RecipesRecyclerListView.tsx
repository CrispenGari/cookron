import React from "react";
import { View, Text } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { COLORS } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { RecipeType } from "../../types";
import Recipe from "../Recipe/Recipe";
import { styles } from "../../styles";

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

interface Props {
  recipes: RecipeType[];
}
const RecipesRecyclerListView: React.FunctionComponent<Props> = ({
  recipes,
}) => {
  const {
    dimension: { width },
  } = useMediaQuery();
  const dataProvider = new DataProvider((r1: RecipeType, r2: RecipeType) => {
    return r1.id !== r2.id;
  });

  const layoutProvider = new LayoutProvider(
    (index) => {
      if (index % 3 === 0) {
        return ViewTypes.FULL;
      } else if (index % 3 === 1) {
        return ViewTypes.HALF_LEFT;
      } else {
        return ViewTypes.HALF_RIGHT;
      }
    },
    (type, dim) => {
      switch (type) {
        case ViewTypes.HALF_LEFT:
          dim.width = width / 2;
          dim.height = 200;
          break;
        case ViewTypes.HALF_RIGHT:
          dim.width = width / 2;
          dim.height = 200;
          break;
        case ViewTypes.FULL:
          dim.width = width;
          dim.height = 300;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  const data = dataProvider.cloneWithRows(recipes);
  const rowRenderer = (type: any, data: RecipeType) => {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <View style={{ flex: 1 }}>
            <Recipe recipe={data} />
          </View>
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <View style={{ flex: 1 }}>
            <Recipe recipe={data} />
          </View>
        );
      case ViewTypes.FULL:
        return (
          <View style={{ flex: 1 }}>
            <Recipe recipe={data} />
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.p,
          {
            fontSize: 20,
            marginLeft: 10,
          },
        ]}
      >
        RECIPES
      </Text>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={data}
        rowRenderer={rowRenderer}
        style={{ backgroundColor: COLORS.main, flex: 1 }}
        scrollThrottle={16}
        applyWindowCorrection={() => {}}
        onScroll={({ nativeEvent }) => {}}
      />
    </View>
  );
};
export default RecipesRecyclerListView;
