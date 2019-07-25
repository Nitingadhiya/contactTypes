import React, { Component } from "react";
import { View, Text } from "react-native";
//import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics, ApplicationStyles, Color } from "../../../common/styles";
import { TextInputView } from "../../../common/components";
import RegisterObj from "../../../api/register-data";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: RegisterObj.notes
    };
  }

  /* text input change */
  textInputChange = (stateVal, value) => {
    RegisterObj.notes = value;
    this.setState({ [stateVal]: value });
  };

  render() {
    const { notes } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Text style={Styles.q2Title}>
          {Helper.translation(
            "Register.Other information / CV / qualifications",
            "Other information / CV / qualifications"
          )}
        </Text>
        <TextInputView
          placeholder={"Qualifications"}
          placeholderTextColor={Color.silver}
          placeholderStyle={ApplicationStyles.placeholderStyle}
          style={ApplicationStyles.textInput}
          value={notes || RegisterObj.notes}
          maxLength={250}
          multiline={true}
          onChangeText={text => this.textInputChange("notes", text)}
          langType={"Register"}
        />
      </View>
    );
  }
}

export { Notes };
