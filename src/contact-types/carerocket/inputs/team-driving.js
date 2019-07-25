import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";

class TeamDriving extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_driving: dataOption.team_driving
    };
  }

  render() {
    const { team_driving } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {team_driving && (
          <Radio
            items={team_driving}
            title={Helper.translation(
              "Register.Interested in team driving?",
              "Interested in team driving?"
            )}
            stateName="team_driving"
            onPress={val => {
              Helper.radioselectOption("team_driving", val);
              this.setState({
                team_driving
              });
            }}
            langType="Words"
          />
        )}
        <ErrorComponent stateName={"team_driving"} />
      </View>
    );
  }
}

export { TeamDriving };
