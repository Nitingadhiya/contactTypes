import React, { Component } from "react";
import { View, Text } from "react-native";
import MIcon from "react-native-vector-icons/MaterialIcons";
import I18n from "react-native-i18n";
import { Matrics, Fonts, Color, ApplicationStyles } from "../../styles";
import Styles from "./styles";
import {
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
//import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import RegisterObj from "../../../api/register-data";

export const Radio = ({
  items,
  title,
  onPress,
  subTitle,
  customStyle,
  radioButtonView,
  langType,
  stateName
}) => {
  roundMark = (stateName, val) => {
    if (
      RegisterObj[stateName] &&
      val === "yes" &&
      RegisterObj[stateName] === true
    ) {
      return <View style={Styles.dotStyles} />;
    } else if (
      !RegisterObj[stateName] &&
      val === "no" &&
      RegisterObj[stateName] === false
    ) {
      return <View style={Styles.dotStyles} />;
    } else if (RegisterObj[stateName] === val) {
      return <View style={Styles.dotStyles} />;
    }
  };

  return (
    <View style={{ alignSelf: "flex-start" }}>
      <Text style={Styles.q2Title}>{title}</Text>
      {subTitle && <Text style={Styles.q2subTitle}>{subTitle}</Text>}
      <View style={customStyle}>
        {items.map((res, index) => (
          <View
            style={[Styles.q2OptionView, radioButtonView]}
            key={index.toString()}
          >
            <TouchableOpacity
              onPress={() => onPress(res.key)}
              style={Styles.q2OptionView}
            >
              <View style={Styles.checkedRoundBRD}>
                {this.roundMark(stateName, res.key)}
              </View>
              <Text style={Styles.q2TitleOption}>
                {Helper.translation(`${langType}.${res.label}`, res.label)}
                {/* {res.label} */}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};
