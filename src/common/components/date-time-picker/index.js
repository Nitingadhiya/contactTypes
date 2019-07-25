import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import I18n from "react-native-i18n";
import MIcon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Matrics, Fonts, Color, ApplicationStyles } from "../../styles";
import Styles from "./styles";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";

export const CustomDateTimePicker = ({
  selectedDate,
  title,
  isDateTimePickerVisible,
  handleDatePicked,
  hideDateTimePicker,
  maximumDate,
  showDateTimePicker
}) => {
  return (
    <View>
      <Text style={[Styles.q2Title, { marginBottom: Matrics.ScaleValue(5) }]}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={showDateTimePicker}
        style={ApplicationStyles.textInput}
      >
        <Text style={Styles.q2TitleValue}>
          {Helper.translation(`Register.${selectedDate}`, selectedDate)}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        maximumDate={maximumDate}
        titleIOS={Helper.translation(`Register.Pick a date`, "Pick a date")}
        cancelTextIOS={Helper.translation(`Words.Cancel`, "Cancel")}
        confirmTextIOS={Helper.translation(`Words.Confirm`, "Confirm")}
      />
    </View>
  );
};
