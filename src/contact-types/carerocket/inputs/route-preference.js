import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class RoutePreference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route_preferences: dataOption.route_preferences
    };
  }

  render() {
    const { route_preferences } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={route_preferences}
          title={Helper.translation(
            "Register.Route Preference",
            "Route Preference"
          )}
          stateName="route_preferences"
          onPress={val => {
            Helper.checkboxselectOption("route_preferences", val);
            this.setState({
              route_preferences
            });
          }}
          langType="Register"
        />
        <ErrorComponent stateName={"route_preferences"} />
      </View>
    );
  }
}

export { RoutePreference };
