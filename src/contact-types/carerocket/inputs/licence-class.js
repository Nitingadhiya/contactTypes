import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class LicenseClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licence_class: dataOption.licence_class
    };
  }

  render() {
    const { licence_class } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {licence_class && (
          <Radio
            items={licence_class}
            title={Helper.translation(
              "Register.License Class",
              "License Class"
            )}
            subTitle={Helper.translation(
              "Register.Which licence class do you own?",
              "Which licence class do you own?"
            )}
            stateName="licence_class"
            onPress={val => {
              Helper.radioselectOption("licence_class", val);
              this.setState({
                licence_class
              });
            }}
            langType="Register"
          />
        )}
        <ErrorComponent stateName={"licence_class"} />
      </View>
    );
  }
}

export { LicenseClass };
