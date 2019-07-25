import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Traveling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelings: null
    };
  }

  render() {
    this.state.travelings = dataOption.travelings;
    const { travelings } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={travelings}
          title={Helper.translation(
            "Register.Preferred traveling",
            "Preferred traveling"
          )}
          stateName="travelings"
          onPress={val => {
            Helper.checkboxselectOption("travelings", val);
            this.setState({
              travelings
            });
          }}
          langType="Register"
        />
        <ErrorComponent stateName={"travelings"} />
      </View>
    );
  }
}

export { Traveling };
