import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Qualifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qualifications: dataOption.qualifications
    };
  }

  render() {
    const { qualifications } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={qualifications}
          title={Helper.translation(
            "Register.Qualifications",
            "Qualifications"
          )}
          stateName="qualifications"
          onPress={val => {
            Helper.checkboxselectOption("qualifications", val);
            Helper.qualificationWanted();
            this.setState({
              qualifications
            });
          }}
          langType={"Register"}
        />
        <ErrorComponent stateName={"qualifications"} />
      </View>
    );
  }
}

export { Qualifications };
