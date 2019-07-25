import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class WillingnessToMove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willingness_to_move: dataOption.willingness_to_move
    };
  }

  render() {
    const { willingness_to_move } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {willingness_to_move && (
          <Radio
            items={willingness_to_move}
            title={Helper.translation(
              "Register.Are you willed to move your home?",
              "Are you willed to move your home?"
            )}
            stateName="willingness_to_move"
            onPress={val => {
              Helper.radioselectOption("willingness_to_move", val);
              this.setState({
                willingness_to_move
              });
            }}
            langType="Words"
          />
        )}
        <ErrorComponent stateName={"qualifications_wanted"} />
      </View>
    );
  }
}

export { WillingnessToMove };
