import React, { Component } from "react";
import { View } from "react-native";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class DayNightPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_night_preferences: dataOption.day_night_preferences
    };
  }
  render() {
    const { day_night_preferences } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {day_night_preferences && (
          <Checkbox
            items={day_night_preferences}
            title={Helper.translation(
              "Register.When would you like to drive?",
              "When would you like to drive?"
            )}
            stateName="day_night_preferences"
            onPress={val => {
              Helper.checkboxselectOption("day_night_preferences", val);
              this.setState({
                day_night_preferences
              });
            }}
            langType={"Register"}
          />
        )}
        <ErrorComponent stateName={"day_night_preferences"} />
      </View>
    );
  }
}

export { DayNightPreferences };
