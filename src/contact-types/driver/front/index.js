import React, { Component } from "react";
import { Text, View } from "react-native";
import FIcon from "react-native-vector-icons/FontAwesome";
import { Color, Images, Matrics } from "../../../common/styles";
import Styles from "./styles";
//import Events from "../../../util/events";
import { Events, Helper } from "../../../util";
//import Helper from "../../../util/helper";

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
    const { stepComplete } = this.props;
    const { language } = this.state;
    return (
      <View>
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
                <FIcon
                  name={"star"}
                  size={Matrics.ScaleValue(22)}
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
            />
          </View>
          {/* {stepArr.map(res => (
            <View
              style={{
                width:
                  Matrics.screenWidth /
                  (stepArr.length + Matrics.ScaleValue(2.5)),
                height: 7,
                backgroundColor: res.value ? Color.darkRed : Color.black,
                borderRadius: 5
              }}
            />
          ))} */}
        </View>
      </View>
    );
  }
}
export default Front;
