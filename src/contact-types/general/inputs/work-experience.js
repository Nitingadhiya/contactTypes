import React, { Component } from "react";
import { View, Text } from "react-native";
import { Helper } from "../../../util";
import { Matrics, ApplicationStyles, Color } from "../../../common/styles";
import { TextInputView } from "../../../common/components";
import RegisterObj from "../../../api/register-data";
import { ErrorObj } from "../../../api/error-data";
import ErrorComponent from "../../../common/components/error-message";

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: RegisterObj.work_experience || ""
    };
  }

  /* text input change */
  textInputChange = (stateVal, value) => {
    RegisterObj.work_experience = value;
    ErrorObj.work_experience = "";
    this.setState({ [stateVal]: value });
  };

  render() {
    const { years } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Text style={ApplicationStyles.q2Title}>
          {Helper.translation(
            "Register.Work experience (in years)",
            "Work experience (in years)"
          )}
        </Text>
        <TextInputView
          placeholder={"Ex4"}
          placeholderTextColor={Color.silver}
          placeholderStyle={ApplicationStyles.placeholderStyle}
          style={ApplicationStyles.textInput}
          value={`${years}` || `${RegisterObj.work_experience}`}
          maxLength={40}
          onChangeText={text => this.textInputChange("years", text)}
          langType={"Register"}
          keyboardType={"number-pad"}
        />
        <ErrorComponent stateName={"work_experience"} />
      </View>
    );
  }
}

export { WorkExperience };
