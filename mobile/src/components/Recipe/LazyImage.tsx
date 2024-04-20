import React from "react";
import { View, Image } from "react-native";
import ContentLoader from "../ContentLoader/ContentLoader";
import { COLORS } from "../../constants";

interface Props {
  uri: string;
}

export const LazyImage: React.FunctionComponent<Props> = ({ uri }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <View style={{ position: "relative", height: 100, overflow: "hidden" }}>
      <ContentLoader
        style={{
          borderRadius: 5,
          backgroundColor: COLORS.secondary,
          marginBottom: 2,
          display: !!!loaded ? "flex" : "none",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
      <Image
        onLoad={() => setLoaded(true)}
        source={{ uri }}
        style={[
          {
            borderRadius: 10,
            opacity: loaded ? 1 : 0,
            height: 100,
            width: "100%",
            zIndex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
          },
        ]}
      />
    </View>
  );
};
