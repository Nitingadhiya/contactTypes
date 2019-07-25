import React, { Component } from "react";
import { View } from "react-native";
import { Matrics } from "../../../common/styles";
import { Radio } from "../../../common/components";
import dataOption from "../../../data";
import ErrorComponent from "../../../common/components/error-message";
import { Events, Helper } from "../../../util";
import RegisterObj from "../../../api/register-data";

class Availabilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_seeking_status: dataOption.job_seeking_status
    };
  }

  render() {
    const { job_seeking_status } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {job_seeking_status && (
          <Radio
            items={job_seeking_status}
            title={Helper.translation(
              "Register.What is your current job-seeking status?",
              "What is your current job-seeking status?"
            )}
            langType="Register"
            stateName="job_seeking_status"
            onPress={val => {
              if (val === "after_notice_period") {
                Events.trigger("after_notice_period", true);
              } else {
                RegisterObj.weeks_until_exit = "";
                Events.trigger("after_notice_period", false);
              }
              Helper.radioselectOption("job_seeking_status", val);
              this.setState({
                job_seeking_status
              });
            }}
          />
        )}
        <ErrorComponent stateName={"job_seeking_status"} />
      </View>
    );
  }
}

export { Availabilities };
