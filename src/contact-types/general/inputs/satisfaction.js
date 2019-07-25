import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics, ApplicationStyles } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Satisfaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      satisfaction_with_current_employer:
        dataOption.satisfaction_with_current_employer
    };
  }

  render() {
    const { satisfaction_with_current_employer } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {satisfaction_with_current_employer && (
          <Radio
            items={satisfaction_with_current_employer}
            title={Helper.translation(
              "Register.How satisfied are you with your current employer? (6: BAD , 1: GOOD)",
              "How satisfied are you with your current employer? (6: BAD , 1: GOOD)"
            )}
            langType="Register"
            stateName="satisfaction_with_current_employer"
            onPress={val => {
              Helper.radioselectOption(
                "satisfaction_with_current_employer",
                val
              );
              this.setState({
                satisfaction_with_current_employer
              });
            }}
            customStyle={ApplicationStyles.customRadioBtnStyles}
            radioButtonView={ApplicationStyles.radioButtonView}
          />
        )}
        <ErrorComponent stateName={"satisfaction_with_current_employer"} />
      </View>
    );
  }
}

export { Satisfaction };
