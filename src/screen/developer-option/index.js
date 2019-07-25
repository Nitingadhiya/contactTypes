import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import {
  TextInputView,
  Header,
  BottomBG,
  SpinnerView,
  ConfirmModal
} from "../../common/components";
import { Color, ApplicationStyles } from "../../common/styles";
import GlobalVar from "../../global";
import Styles from "./styles";
import BottomButton from "../../common/components/bottom-button";
//import Helper from "../../util/helper";
import Http from "../../api/http";
import { Events, Helper } from "../../util";
//import Events from "../../util/events";
import ErrorComponent from "../../common/components/error-message";

class DeveloperOption extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(
      navigation,
      Helper.translation("Profile.Developer Option", "Developer option"),
      "",
      "back"
    );
  state = {
    url: null,
    loading: null,
    errorsMsg: null
  };
  textInputEdit() {
    return (
      <View>
        <TextInputView
          placeholder={"E.g. http://192.168.1.169:8181"}
          placeholderTextColor={Color.silver}
          placeholderStyle={Styles.placeholderStyle}
          style={Styles.textInput}
          value={this.state.url}
          onChangeText={text => this.textInputChange("url", text)}
        />
        {this.state.errorsMsg && (
          <ErrorComponent stateName={"url"} errorsMsg={this.state.errorsMsg} />
        )}
      </View>
    );
  }

  /* text input change */
  textInputChange = (stateVal, value) => {
    this.setState({ [stateVal]: value, errorsMsg: null });
  };

  updateRequest() {
    if (!this.state.url) {
      this.setState({
        errorsMsg: { url: ["Please Enter Valid Url"] }
      });
      return;
    }
    Http.APIURL = `${this.state.url}/api`;
    this.props.navigation.goBack();
    Events.trigger("developerOption");
  }

  render() {
    const { loading, url } = this.state;
    return (
      <View style={Styles.textViewStyle}>
        <View style={Styles.modalViewContainer}>
          <KeyboardAvoidingView
            behavior={GlobalVar.keyboardBehavior()}
            keyboardVerticalOffset={GlobalVar.verticalOffset()}
            style={Styles.keyboardScroll}
          >
            <ScrollView style={Styles.viewContainer}>
              <View style={Styles.modalBody}>{this.textInputEdit()}</View>
            </ScrollView>
            <BottomButton
              onPress={() => this.updateRequest()}
              buttonText={Helper.translation("Profile.Update", "Update")}
              color={Color.darkRed}
            />
          </KeyboardAvoidingView>
        </View>
        <BottomBG color={Color.darkRed90} />
        {loading ? <SpinnerView /> : null}
      </View>
    );
  }
}
export default DeveloperOption;
