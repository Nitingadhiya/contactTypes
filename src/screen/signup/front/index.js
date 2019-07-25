import React, { Component } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-fontawesome-pro";
import { Color, Matrics } from "../../../common/styles";
import Styles from "./styles";
import { Events, Helper } from "../../../util";

const starArr = [
  { value: true },
  { value: true },
  { value: false },
  { value: false },
  { value: false }
];

class Front extends Component {
  state = {
    modalInfo: true,
    lang: null,
    language: [
      {
        title: Helper.translation("Words.English", "English"),
        value: "en",
        checked: true
      },
      {
        title: Helper.translation("Words.German", "German"),
        value: "de",
        checked: false
      },
      {
        title: Helper.translation("Words.Polish", "Polish"),
        value: "pl",
        checked: false
      }
    ]
  };
  componentDidMount() {
    const { language } = this.state;
    language.map((res, i) => {
      if (res.value === global.currentAppLanguage) {
        language[i].checked = true;
        this.languageSetup = language[i].value;
      } else {
        language[i].checked = false;
      }
    });
    this.setState({
      language
    });
  }

  saveStepProcess = () => {
    Events.trigger("languageSetup", this.languageSetup);
    Events.trigger("refreshSignup", this.languageSetup);
    this.setState({
      modalInfo: false,
      lang: this.languageSetup
    });
  };
  selectOption(items, index) {
    let data = items;
    items.map((res, i) => {
      if (i === index) {
        data[i].checked = true;
        this.languageSetup = data[i].value;
      } else {
        data[i].checked = false;
      }
    });
    this.setState({
      [items]: data
    });
  }

  render() {
    const {
      stepComplete,
      profileScreen,
      firstName,
      emailAddress,
      phoneNumber,
      Fillprofile,
      contactInfo
    } = this.props;
    const stepVerify = [
      {
        key: "firstName",
        label: Helper.translation(
          "Profile.Specify first and last name",
          "Specify first and last name"
        ),
        checked: false
      },
      {
        key: "emailAddress",
        label: Helper.translation(
          "Profile.Verify e-mail address",
          "Verify e-mail address"
        ),
        checked: false
      },
      {
        key: "phoneNumber",
        label: Helper.translation(
          "Profile.Verify mobile number",
          "Verify mobile number"
        ),
        checked: false
      },
      {
        key: "Fillprofile",
        label: Helper.translation(
          "Profile.Fill out the profile",
          "Fill out the profile"
        ),
        checked: false
      },
      {
        key: "contactInfo",
        label: Helper.translation(
          "Profile.Confirm that you are ready to give your contact information to potential companies",
          "Confirm that you are ready to give your contact information to potential companies"
        ),
        checked: false
      }
    ];
    checkStep = key => {
      if (key === "firstName") return firstName;
      if (key === "emailAddress") return emailAddress;
      if (key === "phoneNumber") return phoneNumber;
      if (key === "contactInfo") return contactInfo;
      if (key === "Fillprofile") return Fillprofile;
      return false;
    };

    return (
      <View style={Styles.mainFront}>
        <View style={Styles.driverTextView}>
          <Text style={Styles.starDriver}>
            {Helper.translation(
              "Register.Become 5-Stars-Driver",
              "Become 5-Stars-Driver"
            )}
          </Text>
        </View>
        <View style={Styles.starIconView}>
          <View style={{ flexDirection: "row" }}>
            {starArr &&
              starArr.map((res, index) => (
                <Icon
                  name={Helper.splitIconName("fa-star")}
                  size={Matrics.ScaleValue(22)}
                  type={res.value ? "solid" : "regular"}
                  color={res.value ? Color.darkRed : Color.paleGreyTwo}
                  style={{ marginRight: Matrics.ScaleValue(5) }}
                  key={index.toString()}
                />
              ))}
          </View>
          <Text style={Styles.textdesc}>
            {Helper.translation(
              "Register.5StarDrive",
              "Once you become a 5-star driver, potential employers can find you and offer you new jobs. All you have to do is give some details about yourself and your current job"
            )}
          </Text>
        </View>
        <View style={Styles.progressMainView}>
          <View style={Styles.progressView}>
            <View
              style={[
                Styles.progressView,
                Styles.fillProgressView,
                { width: stepComplete }
              ]}
            >
              {profileScreen && (
                <Text style={Styles.stepCompleText}>{stepComplete}</Text>
              )}
            </View>
          </View>
        </View>
        {profileScreen && (
          <View style={Styles.verifyView}>
            {stepVerify.map(res => (
              <View style={Styles.subVerifyView} key={`${res.key}`}>
                <Icon
                  name={Helper.splitIconName(
                    checkStep(res.key) ? "fa-check-square" : "fa-square"
                  )}
                  size={Matrics.ScaleValue(15)}
                  color={Color.black70}
                />
                <Text style={Styles.textVerify}>{res.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}
export default Front;
