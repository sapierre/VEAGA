import { Dimensions, Platform } from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
