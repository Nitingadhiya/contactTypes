import React, { Component } from "react";
import { View } from "react-native";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Endorsements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endorsements: dataOption.endorsements
    };
  }

  render() {
    const { endorsements } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={endorsements}
          title={Helper.translation(
            "Register.What is important for you?",
            "What is important for you? (max. 3 to choose from)"
          )}
          stateName="endorsements"
          onPress={val => {
            Helper.checkboxselectOption("endorsements", val);
            this.setState({
              endorsements
            });
          }}
          langType="Register"
        />
        <ErrorComponent stateName={"endorsements"} />
      </View>
    );
  }
}

export { Endorsements };
