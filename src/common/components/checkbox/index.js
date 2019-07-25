import React from "react";
import { View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Matrics, Color } from "../../styles";
import Styles from "./styles";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import RegisterObj from "../../../api/register-data";
import GlobalVar from "../../../global";

export const Checkbox = ({
  items,
  title,
  onPress,
  subTitle,
  customOptionStyle,
  customView,
  langType,
  stateName,
  mainView,
  privacyPolicy,
  disabled,
  screen
}) => {
  IconView = () => (
    <Icon
      name={"ios-checkmark"}
      color={Color.darkRed}
      size={Matrics.ScaleValue(28)}
      style={{
        marginTop:
          Platform.OS === "ios" ? Matrics.ScaleValue(-4) : Matrics.ScaleValue(0)
      }}
    />
  );

  checkMark = (stateName, val) => {
    console.log(RegisterObj[stateName], RegisterObj[stateName]);
    if (!RegisterObj[stateName]) return null;
    return RegisterObj[stateName].includes(val) ? this.IconView() : null;
  };

  return (
    <View style={[Styles.checkboxView, mainView]}>
      <Text style={Styles.q2Title}>{title}</Text>
      {subTitle && <Text style={Styles.q2subTitle}>{subTitle}</Text>}
      {items.map((res, index) => (
        <View style={[Styles.q2OptionView, customView]} key={index.toString()}>
          <TouchableOpacity
            style={Styles.touchBtn}
            onPress={() => onPress(res.key)}
            activeOpacity={0.9}
            disabled={disabled}
          >
            <View style={Styles.checkView}>
              {screen === "jobDetails"
                ? this.IconView()
                : this.checkMark(stateName, res.key)}
            </View>
            <Text style={[Styles.q2TitleOption, customOptionStyle]}>
              {screen === "jobDetails"
                ? res
                : Helper.translation(`${langType}.${res.label}`, res.label)}
              {privacyPolicy && index === 0 && (
                <Text
                  style={Styles.privacyText}
                  onPress={() => Linking.openURL(GlobalVar.privacyPolicyURL())}
                >
                  {" "}
                  {Helper.translation(
                    "Words.privacy policy",
                    "privacy policy."
                  )}
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
