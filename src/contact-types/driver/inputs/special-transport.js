import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";

class SpecialTransport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      special_transport: dataOption.special_transport
    };
  }

  render() {
    const { special_transport } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {special_transport && (
          <Radio
            items={special_transport}
            title={Helper.translation(
              "Register.Special and heavy transportation",
              "Special and heavy transportation"
            )}
            subTitle={Helper.translation(
              "Register.Are you willed to drive special and heavy cargo?",
              "Are you willed to drive special and heavy cargo?"
            )}
            stateName="special_transport"
            onPress={val => {
              Helper.radioselectOption("special_transport", val);
              this.setState({
                special_transport
              });
            }}
            langType="Register"
          />
        )}
      </View>
    );
  }
}

export { SpecialTransport };
