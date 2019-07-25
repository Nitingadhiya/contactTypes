import React, { Component } from "react";
import { View, Text } from "react-native";
import { Helper } from "../../../util";
import { Matrics, ApplicationStyles } from "../../../common/styles";
import LivineWorkingInput from "../../../common/components/living-working-input";

class LivingWorking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livingAddress: null
    };
  }

  /* text input change */
  textInputChange = (stateVal, value) => {
    this.setState({ [stateVal]: value });
  };

  render() {
    const { livingAddress } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Text style={ApplicationStyles.q2Title}>
          {Helper.translation(
            "Register.Where could you imagine living and/or working?",
            "Where could you imagine living and/or working?"
          )}
        </Text>
        <LivineWorkingInput googleaddress={livingAddress} />
      </View>
    );
  }
}

export { LivingWorking };
