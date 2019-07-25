import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics, ApplicationStyles } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";

class TermsAndCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termsCond: dataOption.termsCond
    };
  }

  render() {
    const { termsCond } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {termsCond && (
          <Checkbox
            items={termsCond}
            title={""}
            stateName="termsCond"
            onPress={val => {
              Helper.checkboxselectOption("termsCond", val);
              this.setState({
                termsCond
              });
            }}
            customOptionStyle={ApplicationStyles.checkboxTitleStyle}
            customView={ApplicationStyles.checkboxView}
            langType="Register"
            privacyPolicy
          />
        )}
      </View>
    );
  }
}

export { TermsAndCondition };
