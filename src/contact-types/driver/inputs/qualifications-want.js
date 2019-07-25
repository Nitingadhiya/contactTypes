import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { Helper, Events } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Checkbox } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class QualificationsWant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qualifications_wanted: dataOption.qualifications_wanted
    };
  }

  componentDidMount() {
    Events.on("qualificationWanted", "qualification", () => {
      this.setState({
        qualifications_wanted: dataOption.qualifications_wanted
      });
    });
  }

  render() {
    this.state.qualifications_wanted = dataOption.qualifications_wanted;
    const { qualifications_wanted } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <Checkbox
          items={qualifications_wanted}
          title={Helper.translation(
            "Register.What kind of qualifications do you want to get?",
            "What kind of qualifications do you want to get?"
          )}
          subTitle={Helper.translation(
            "Register.What kind of qualifications / bills do you have? What would you like to do?",
            "What kind of qualifications / bills do you have? What would you like to do?"
          )}
          stateName="qualifications_wanted"
          onPress={val => {
            Helper.checkboxselectOption("qualifications_wanted", val);
            this.setState({
              qualifications_wanted
            });
          }}
          langType={"Register"}
        />
        <ErrorComponent stateName={"qualifications_wanted"} />
      </View>
    );
  }
}

export { QualificationsWant };
