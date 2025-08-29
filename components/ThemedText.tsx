import { Text, type TextProps, StyleSheet, TextStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};

type PrimaryFontFamily =
  | "mrt-regular"
  | "mrt-bold"
  | "mrt-semibold"
  | "mrt-extrabold"
  | "mrt-medium"
  | "mrt-light"
  | "mrt-thin";

const fontFamilyForWeight: Record<
  NonNullable<TextStyle["fontWeight"]>,
  PrimaryFontFamily
> = {
  normal: "mrt-regular",
  bold: "mrt-bold",
  "100": "mrt-thin",
  "200": "mrt-light",
  "300": "mrt-light",
  "400": "mrt-regular",
  "500": "mrt-medium",
  "600": "mrt-semibold",
  "700": "mrt-bold",
  "800": "mrt-extrabold",
  "900": "mrt-extrabold",
  ultralight: "mrt-thin",
  thin: "mrt-thin",
  light: "mrt-light",
  medium: "mrt-medium",
  semibold: "mrt-semibold",
  condensedBold: "mrt-extrabold",
  regular: "mrt-regular",
  condensed: "mrt-regular",
  heavy: "mrt-regular",
  black: "mrt-regular",
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const flattenedStyle = StyleSheet.flatten<TextStyle>(style);
  const { fontWeight, ...otherStyles } = flattenedStyle || {};
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "HeadlineText"
  );

  return (
    <Text
      style={[
        { color, fontFamily: fontFamilyForWeight[fontWeight ?? "400"] },
        style,
      ]}
      {...rest}
    />
  );
}
