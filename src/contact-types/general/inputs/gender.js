import React, { Component } from "react";
import { View } from "react-native";
import moment from "moment";
//import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class Gender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: dataOption.gender
    };
  }

  render() {
    const { gender } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Radio
          items={gender}
          title={Helper.translation("Words.Gender", "Gender")}
          langType="Words"
          stateName="gender"
          onPress={val => {
            Helper.radioselectOption("gender", val);
            this.setState({
              gender
            });
          }}
        />
        <ErrorComponent stateName={"gender"} />
      </View>
    );
  }
}

export { Gender };
