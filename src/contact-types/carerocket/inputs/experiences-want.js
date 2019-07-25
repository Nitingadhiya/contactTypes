import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform, Alert } from "react-native";
//import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class ExperiencesWant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experiences_wanted: dataOption.experiences_wanted
    };
  }

  render() {
    const { experiences_wanted } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={experiences_wanted}
          title={Helper.translation(
            "Register.In which areas have you not been active and would you like to gain experience?",
            "In which areas have you not been active and would you like to gain experience?"
          )}
          subTitle={Helper.translation(
            "Register.What experiences do you have Bock? What could you imagine doing?",
            "What experiences do you have Bock? What could you imagine doing?"
          )}
          stateName="experiences_wanted"
          onPress={val => {
            Helper.checkboxselectOption("experiences_wanted", val);
            this.setState({
              experiences_wanted
            });
          }}
          langType={"Register"}
        />
        <ErrorComponent stateName={"experiences_wanted"} />
      </View>
    );
  }
}

export { ExperiencesWant };
