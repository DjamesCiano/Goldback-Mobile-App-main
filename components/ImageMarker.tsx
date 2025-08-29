import { FC, useState } from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

type Props = {
  latitude: number;
  longitude: number;
  type?: "group" | "single";
  onPress: () => void;
};

const ImageMarker: FC<Props> = ({
  latitude,
  longitude,
  onPress,
  type = "single",
}) => {
  const [shouldTrackViewChanges, setShouldTrackViewChanges] = useState(true);

  const img =
    type === "group"
      ? require("@/assets/images/map-marker-group.png")
      : require("@/assets/images/map-marker.png");

  const stopTrackingViewChanges = () => {
    setShouldTrackViewChanges(false);
  };

  return (
    <Marker
      tracksViewChanges={shouldTrackViewChanges}
      coordinate={{
        latitude,
        longitude,
      }}
      onPress={onPress}
    >
      <Image
        style={{
          width: 28,
          height: 37,
        }}
        source={img}
        onLoad={stopTrackingViewChanges}
        fadeDuration={0}
      />
    </Marker>
  );
};

export default ImageMarker;
