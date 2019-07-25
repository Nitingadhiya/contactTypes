import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
//import Helper from "../../../util/helper";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class ImportantWishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      important_wishes: dataOption.important_wishes
    };
  }

  render() {
    const { important_wishes } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={important_wishes}
          title={Helper.translation(
            "Register.What is important for you?",
            "What is important for you? (max. 3 to choose from)"
          )}
          stateName="important_wishes"
          onPress={val => {
            Helper.checkboxselectOption("important_wishes", val);
            this.setState({
              important_wishes
            });
          }}
          langType="Register"
        />
        <ErrorComponent stateName={"important_wishes"} />
      </View>
    );
  }
}

export { ImportantWishes };
