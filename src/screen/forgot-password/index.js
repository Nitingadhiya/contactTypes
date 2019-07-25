import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Text
} from "react-native";
import {
  TextInputView,
  Header,
  BottomBG,
  ConfirmModal
} from "../../common/components";
import { Color } from "../../common/styles";
import GlobalVar from "../../global";
import Styles from "./styles";
import BottomButton from "../../common/components/bottom-button";
import Http from "../../api/http";
import { Helper, APICaller, Events } from "../../util";

const textInputArray = [
  {
    placeholder: "Email Id",
    stateName: "email",
    returnKeyType: "done",
    keyboardType: "email-address",
    nextRef: "MobileNo",
    ref: "Email"
  }
];

class ForgotPassword extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(
      navigation,
      Helper.translation("Forgot.Forgot Password", "Forgot Password"),
      "",
      "back"
    );

  state = {
    email: "",
    passwordMessage: null
  };

  componentDidMount() {
    Helper.trackScreenView("ForogtPasswordScreen");
  }

  /* text input change */
  textInputChange = (stateVal, value) => {
    this.setState({ [stateVal]: value });
  };

  // Text input method
  textInput = (
    placeholder,
    stateName,
    returnKeyType,
    keyboardType,
    nextRef,
    secureTextEntry,
    value,
    ref,
    multiline
  ) => (
    <TextInputView
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={Color.silver}
      placeholderStyle={Styles.placeholderStyle}
      style={Styles.textInput}
      value={value[stateName]}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType}
      multiline={multiline}
      onChangeText={email => this.textInputChange(stateName, email)}
      langType={"Register"}
      key={`${nextRef}_Text`}
    />
  );

  textInputEdit = () => {
    if (textInputArray) {
      return textInputArray.map(res => {
        return this.textInput(
          res.placeholder,
          res.stateName,
          res.returnKeyType,
          res.keyboardType,
          res.nextRef,
          res.secureTextEntry,
          this.state,
          res.ref,
          res.multiline
        );
      });
    }
    return null;
  };

  /* Simple login  */
  resetPassword = () => {
    Events.trigger("loading", true);
    const { email } = this.state;
    const body = {
      email,
      language: global.currentAppLanguage
    };
    APICaller(`${Http.resetPasswordEndPoint}`, "POST", "", body).then(json => {
      Events.trigger("loading", false);
      if (json) {
        if (json.status && json.status !== GlobalVar.responseSuccess) {
          const errors = json.data.errors;
          this.setState({
            errorsMsg: GlobalVar.requestFailedMsg // set state Error message
          });
          return;
        }
        const resp = json.data;
        this.setState({
          passwordMessage: resp.message
        });
      }
    });
  };

  confirmModalRender = passwordMessage => (
    <ConfirmModal
      title={Helper.translation("Profile.Success", "Success")}
      message={passwordMessage}
      rightButton={Helper.translation("Profile.Ok", "Ok")}
      leaveModalReq={() => this.hideConfiromModal()}
    />
  );

  hideConfiromModal = () => {
    const { navigation } = this.props;
    this.setState({
      passwordMessage: null
    });
    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const { passwordMessage } = this.state;

    return (
      <SafeAreaView style={Styles.textViewStyle}>
        <View style={Styles.modalViewContainer}>
          <KeyboardAvoidingView
            behavior={GlobalVar.keyboardBehavior()}
            keyboardVerticalOffset={GlobalVar.verticalOffset()}
            style={Styles.keyboardScroll}
          >
            <ScrollView style={Styles.viewContainer}>
              <View style={Styles.regEmailView}>
                <Text style={Styles.registeredEmailText}>
                  {Helper.translation(
                    "Forgot.We just need your registered Email id to send you password reset instructions",
                    "We just need your registered Email id to send you password reset instructions."
                  )}
                </Text>
              </View>
              <View style={Styles.modalBody}>{this.textInputEdit()}</View>
            </ScrollView>
            <BottomButton
              onPress={() => this.resetPassword(navigation)}
              buttonText={Helper.translation("Forgot.Submit", "Submit")}
              color={Color.darkRed}
            />
          </KeyboardAvoidingView>
        </View>
        <BottomBG color={Color.darkRed90} />
        {passwordMessage && this.confirmModalRender(passwordMessage)}
      </SafeAreaView>
    );
  }
}
export default ForgotPassword;
