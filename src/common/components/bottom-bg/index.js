import React, { Component } from "react";
import { View } from "react-native";
import Styles from "./styles";

export const BottomBG = ({ color }) => (
  <View style={[Styles.bottomBg, { backgroundColor: color }]} />
);
