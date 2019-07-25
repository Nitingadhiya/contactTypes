import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Experiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experiences: dataOption.experiences
    };
  }

  render() {
    const { experiences } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={experiences}
          title={Helper.translation("Register.Experiences", "Experiences")}
          stateName="experiences"
          onPress={val => {
            Helper.checkboxselectOption("experiences", val);
            this.setState({
              experiences
            });
          }}
          langType={"Register"}
        />
        <ErrorComponent stateName={"experiences"} />
      </View>
    );
  }
}

export { Experiences };
