import React, { Component } from "react";
import { View } from "react-native";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Accidents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accidents_or_violence_past_3_years:
        dataOption.accidents_or_violence_past_3_years
    };
  }

  render() {
    const { accidents_or_violence_past_3_years } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {accidents_or_violence_past_3_years && (
          <Radio
            items={accidents_or_violence_past_3_years}
            title={Helper.translation(
              "Register.Have you had any accidents or violations in the past 3 years?",
              "Have you had any accidents or violations in the past 3 years?"
            )}
            stateName="accidents_or_violence_past_3_years"
            onPress={val => {
              Helper.radioselectOption(
                "accidents_or_violence_past_3_years",
                val
              );
              this.setState({
                accidents_or_violence_past_3_years
              });
            }}
            langType="Words"
          />
        )}
        <ErrorComponent stateName={"accidents_or_violence_past_3_years"} />
      </View>
    );
  }
}

export { Accidents };
