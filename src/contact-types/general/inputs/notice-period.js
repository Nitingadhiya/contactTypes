import React, { Component } from "react";
import { View } from "react-native";
import { Helper } from "../../../util";
import { CustomPicker } from "../../../common/components";
import dataOption from "../../../data";
import RegisterObj from "../../../api/register-data";
import ErrorComponent from "../../../common/components/error-message";
import { ErrorObj } from "../../../api";

class NoticePeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      after_notice_period: "",
      selectedItem: ""
    };
  }

  closePress() {}

  selected(selected) {
    this.setState({
      selectedItem: selected
    });
    ErrorObj.weeks_until_exit = "";
    dataOption.after_notice_period = this.state.after_notice_period;
    RegisterObj.weeks_until_exit = selected.Code;
  }

  onBackRequest() {}

  render() {
    this.state.after_notice_period = [
      {
        Value: "0 Weeks",
        Name: `0 ${Helper.translation("Register.Weeks", "0 Weeks")}`,
        Code: "0",
        Id: 1
      },
      {
        Value: "1 Weeks",
        Name: `1 ${Helper.translation("Register.Weeks", "1 Weeks")}`,
        Code: "1",
        Id: 2
      },
      {
        Value: "2 Weeks",
        Name: `2 ${Helper.translation("Register.Weeks", "2 Weeks")}`,
        Code: "2",
        Id: 3
      },
      {
        Value: "3 Weeks",
        Name: `3 ${Helper.translation("Register.Weeks", "3 Weeks")}`,
        Code: "3",
        Id: 4
      },
      {
        Value: "4 Weeks",
        Name: `4 ${Helper.translation("Register.Weeks", "4 Weeks")}`,
        Code: "4",
        Id: 5
      },
      {
        Value: "5 Weeks",
        Name: `5 ${Helper.translation("Register.Weeks", "5 Weeks")}`,
        Code: "5",
        Id: 6
      },
      {
        Value: "6 Weeks",
        Name: `6 ${Helper.translation("Register.Weeks", "6 Weeks")}`,
        Code: "6",
        Id: 7
      },
      {
        Value: "7 Weeks",
        Name: `7 ${Helper.translation("Register.Weeks", "7 Weeks")}`,
        Code: "7",
        Id: 8
      }
    ];
    this.state.selectedItem = RegisterObj.weeks_until_exit
      ? {
          Value: `${RegisterObj.weeks_until_exit} Weeks`,
          Name: `${RegisterObj.weeks_until_exit} ${Helper.translation(
            "Register.Weeks",
            `${RegisterObj.weeks_until_exit} Weeks`
          )}`,
          Code: `${RegisterObj.weeks_until_exit}`,
          Id: 7
        }
      : null;
    const { after_notice_period, selectedItem } = this.state;
    return (
      <View>
        <CustomPicker
          title={Helper.translation(
            "Register.Select period of notice",
            "Select period of notice"
          )}
          onClosed={() => this.closePress()}
          onSelected={selected => this.selected(selected)}
          onBackButtonPressed={this.onBackRequest()}
          items={after_notice_period}
          selectedItem={selectedItem}
          selectPlaceholderText={Helper.translation(
            "Register.-- Select notice period --",
            "-- Select notice period --"
          )}
          searchPlaceholderText={Helper.translation(
            "Register.Search",
            "Search..."
          )}
          showAlphabeticalIndex={true}
        />
        <ErrorComponent stateName={"weeks_until_exit"} />
      </View>
    );
  }
}

export { NoticePeriod };
