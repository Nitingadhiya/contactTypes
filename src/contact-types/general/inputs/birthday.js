import React, { Component } from "react";
import { View } from "react-native";
import moment from "moment";
import { Helper } from "../../../util";
//import Helper from "../../../util/helper";
import { Matrics } from "../../../common/styles";
import { CustomDateTimePicker } from "../../../common/components";
import RegisterObj from "../../../api/register-data";
import ErrorComponent from "../../../common/components/error-message";
import { ErrorObj } from "../../../api";

class Birthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: RegisterObj.birthday || "Please select birthday",
      isDateTimePickerVisible: false
    };
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = selectedDate => {
    let date = "";
    if (this.state.changeDate == false) {
      var fulldate = new Date(); //--> your minimum date
      date = moment(fulldate, "YYYY/MM/DD").format("YYYY-MM-DD");
    } else {
      date = moment(selectedDate, "YYYY/MM/DD").format("YYYY-MM-DD");
    }
    let splt = date.split("-");
    RegisterObj.birthday = date;
    RegisterObj.birthday_day = splt[0];
    RegisterObj.birthday_month = splt[1];
    RegisterObj.birthday_year = splt[2];
    ErrorObj.birthday_day = null;
    this.setState({
      birthday: date
    });
    this.hideDateTimePicker();
  };

  render() {
    if (RegisterObj.birthday) {
      this.state.birthday = RegisterObj.birthday;
    }
    const { birthday, isDateTimePickerVisible } = this.state;
    return (
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        <CustomDateTimePicker
          title={Helper.translation("Words.Birthday", "Birthday")}
          selectedDate={birthday}
          isDateTimePickerVisible={isDateTimePickerVisible}
          handleDatePicked={date => this.handleDatePicked(date)}
          hideDateTimePicker={() => this.hideDateTimePicker()}
          maximumDate={new Date()}
          showDateTimePicker={() => this.showDateTimePicker()}
        />
        <ErrorComponent stateName={"birthday_day"} />
      </View>
    );
  }
}

export { Birthday };
