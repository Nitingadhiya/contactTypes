import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class LicenseSuspended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licence_suspended_or_charges_last_10_years:
        dataOption.licence_suspended_or_charges_last_10_years
    };
  }

  render() {
    const { licence_suspended_or_charges_last_10_years } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {licence_suspended_or_charges_last_10_years && (
          <Radio
            items={licence_suspended_or_charges_last_10_years}
            title={Helper.translation(
              "Register.Have you had your license suspended or DUI/DWI charges in the past 10 years?",
              "Have you had your license suspended or DUI/DWI charges in the past 10 years?"
            )}
            stateName="licence_suspended_or_charges_last_10_years"
            onPress={val => {
              Helper.radioselectOption(
                "licence_suspended_or_charges_last_10_years",
                val
              );
              this.setState({
                licence_suspended_or_charges_last_10_years
              });
            }}
            langType="Words"
          />
        )}
        <ErrorComponent
          stateName={"licence_suspended_or_charges_last_10_years"}
        />
      </View>
    );
  }
}

export { LicenseSuspended };
