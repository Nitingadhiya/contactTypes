import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
//import Helper from "../../../../util/helper";
import Icon from "react-native-fontawesome-pro";
import _ from "lodash";
import {
  Matrics,
  ApplicationStyles,
  Color,
  Fonts
} from "../../../../common/styles";
import dataOption from "../../../../data";
import RegisterObj from "../../../../api/register-data";
import GlobalVar from "../../../../global";
import { Events, Helper } from "../../../../util";
//import Events from "../../../../util/events";
import Styles from "./styles";

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerType: dataOption.registerType,
      education: RegisterObj.education
    };
  }
  componentDidMount() {
    const { registerType } = this.state;
    const index = _.findIndex(registerType, { key: RegisterObj.type });
    if (index > -1) {
      this.state.registerType[index].selected = true;
      this.setState({
        registerType: this.state.registerType
      });
    }
  }

  chooseRegisterType = (registerType, index) => {
    registerType.map((res, index) => {
      registerType[index].selected = false;
    });

    registerType[index].selected = true;
    this.setState({
      registerType
    });
    RegisterObj.type = registerType[index].key;
    RegisterObj.education = false;
    Events.trigger("education", RegisterObj.education);
  };

  chooseRegisterEducation = index => {
    const education = index === 0 ? false : true;
    this.setState({ education: education });
    RegisterObj.education = education;
    Events.trigger("education", education);
  };

  render() {
    this.state.education = !RegisterObj.education ? false : true;
    const { registerType, education } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text style={ApplicationStyles.q2Title}>
          {Helper.translation("Register.I am", "I am")} :{" "}
        </Text>
        {GlobalVar.country === "US" &&
          registerType.map((res, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={ApplicationStyles.chooseTypeReg}
              onPress={() => this.chooseRegisterType(registerType, index)}
            >
              <Icon
                name={Helper.splitIconName("fa-truck")}
                type="solid"
                size={Matrics.ScaleValue(30)}
                color={
                  res.key === RegisterObj.type ? Color.darkRed : Color.black30
                }
              />
              <Text
                style={[
                  Styles.typeLabel,
                  {
                    color:
                      res.key === RegisterObj.type
                        ? Color.darkRed
                        : Color.black70
                  }
                ]}
              >
                {Helper.translation(`Register.${res.label}`, res.label)}
              </Text>
            </TouchableOpacity>
          ))}
        {(GlobalVar.country === "DE" || GlobalVar.country === "PL") && (
          <View>
            <TouchableOpacity
              style={ApplicationStyles.chooseTypeReg}
              onPress={() => this.chooseRegisterEducation(0)}
            >
              <Icon
                name={Helper.splitIconName("fa-truck")}
                type="solid"
                size={Matrics.ScaleValue(30)}
                color={!education ? Color.darkRed : Color.black30}
              />
              <Text
                style={[
                  Styles.typeLabel,
                  {
                    color: !education ? Color.darkRed : Color.black70
                  }
                ]}
              >
                {Helper.translation(`Register.Truck driver`, "Truck driver")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ApplicationStyles.chooseTypeReg}
              onPress={() => this.chooseRegisterEducation(1)}
            >
              <Icon
                name={Helper.splitIconName("fa-graduation-cap")}
                type="solid"
                size={Matrics.ScaleValue(30)}
                color={education ? Color.darkRed : Color.black30}
              />
              <Text
                style={[
                  Styles.typeLabel,
                  { color: education ? Color.darkRed : Color.black30 }
                ]}
              >
                {Helper.translation(
                  `Register.Interested`,
                  "Prospective customer"
                )}
                {`\n`}
                <Text style={Styles.subText}>
                  (
                  {Helper.translation(
                    `Register.for an education`,
                    "for an education"
                  )}
                  )
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export { Type };
