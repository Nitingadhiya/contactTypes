import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class LeasePurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lease_purchase: dataOption.lease_purchase
    };
  }

  render() {
    const { lease_purchase } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {lease_purchase && (
          <Radio
            items={lease_purchase}
            title={Helper.translation(
              "Register.Interested in lease purchase?",
              "Interested in lease purchase?"
            )}
            stateName="lease_purchase"
            onPress={val => {
              Helper.radioselectOption("lease_purchase", val);
              this.setState({
                lease_purchase
              });
            }}
            langType="Words"
          />
        )}
        <ErrorComponent stateName={"lease_purchase"} />
      </View>
    );
  }
}

export { LeasePurchase };
