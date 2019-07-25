import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import RegisterObj from "../../../api/register-data";

class Tackle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tackles: dataOption.tackles
    };
  }
  render() {
    if (RegisterObj.tackles) {
      this.state.tackles = RegisterObj.tackles;
    }
    this.state.tackles = dataOption.tackles;
    const { tackles } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {tackles && (
          <Checkbox
            items={tackles}
            title={Helper.translation(
              "Register.Willed to tackle?",
              "Willed to tackle?"
            )}
            stateName="tackles"
            onPress={val => {
              Helper.checkboxselectOption("tackles", val);
              this.setState({
                tackles
              });
            }}
            langType="Register"
          />
        )}
      </View>
    );
  }
}

export { Tackle };
