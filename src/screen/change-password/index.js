import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text } from "react-native";
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
import { APICaller, Helper } from "../../util";
//import APICaller from "../../util/apiCaller";

class ChangePassword extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(
      navigation,
      Helper.translation("Profile.Change Password", "Change Password"),
      "",
      "back"
    );

  state = {
    oldPassword: "",
    newPassword: "",
    cPassword: "",
    loading: false,
    textInputArray: [
      // {
      //   placeholder: "Old Password",
      //   stateName: "oldPassword",
      //   returnKeyType: "next",
      //   keyboardType: "default",
      //   nextRef: "NewPassword",
      //   ref: "OldPassword",
      //   secureTextEntry: true,
      // },
      {
        placeholder: "New Password",
        stateName: "newPassword",
        returnKeyType: "next",
        keyboardType: "default",
        nextRef: "CPassword",
        ref: "NewPassword",
        secureTextEntry: true,
        errMessageType: "password1",
        passwordVisible: true
      },
      {
        placeholder: "Confirm New Password",
        stateName: "cPassword",
        returnKeyType: "done",
        keyboardType: "default",
        nextRef: "CPassword1",
        ref: "CPassword",
        secureTextEntry: true,
        errMessageType: "passwordErrMessage",
        passwordVisible: true
      }
    ]
  };

  componentDidMount() {
    Helper.trackScreenView("ChangePasswordScreen");
  }

  loadingView(isVisible) {
    this.setState({
      loading: isVisible
    });
  }

  changePasswordRequest() {
    const { newPassword, cPassword } = this.state;
    this.loadingView(true);
    const body = {
      password: newPassword,
      password_confirmation: cPassword
    };
    APICaller(
      `${Http.changePasswordEndPoint}`,
      "PUT",
      global.apiToken,
      body
    ).then(json => {
      if (json.status && json.status === GlobalVar.responseInvalidCode) {
        const errors = json.data.errors;
        this.setState({
          passwordErrMessage: Helper.errorMessage(errors, "password")
        });
        this.loadingView(false);
        return;
      }
      const resp = json.data;
      this.setState({
        passwordMessage: resp.message
      });
      this.loadingView(false);
    });
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
    ref,
    secureTextEntry,
    value,
    errMessageType,
    passwordVisible,
    index
  ) => (
    <View key={`${nextRef}_Text`}>
      <TextInputView
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Color.silver}
        placeholderStyle={Styles.placeholderStyle}
        style={Styles.textInput}
        value={value[stateName]}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={() => {
          if (ref === "OldPassword") {
            this.NewPassword.focus();
          } else if (ref === "NewPassword") {
            this.CPassword.focus();
          }
        }}
        onChangeText={text => this.textInputChange(stateName, text)}
        Ref={r => {
          if (ref === "OldPassword") {
            this.OldPassword = r;
          } else if (ref === "NewPassword") {
            this.NewPassword = r;
          } else if (ref === "CPassword") {
            this.CPassword = r;
          }
        }}
        langType={"Profile"}
        passwordVisible={passwordVisible}
        passwordVisibleFn={() => this.passwordVisibleFn(index)}
      />
      {this.state[errMessageType] && (
        <Text style={ApplicationStyles.errorMessage}>
          {this.state[errMessageType]}
        </Text>
      )}
    </View>
  );

  passwordVisibleFn(index) {
    const { textInputArray } = this.state;
    textInputArray[index].secureTextEntry = !textInputArray[index]
      .secureTextEntry;
    this.setState({
      textInputArray: textInputArray
    });
  }

  textInputEdit = () => {
    const { textInputArray } = this.state;
    if (textInputArray) {
      return textInputArray.map((res, index) => {
        return this.textInput(
          res.placeholder,
          res.stateName,
          res.returnKeyType,
          res.keyboardType,
          res.nextRef,
          res.ref,
          res.secureTextEntry,
          this.state,
          res.errMessageType,
          res.passwordVisible,
          index
        );
      });
    }
    return null;
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
    const { loading, passwordMessage } = this.state;
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
              onPress={() => this.changePasswordRequest()}
              buttonText={Helper.translation(
                "Profile.Change Password",
                "Change Password"
              )}
              color={Color.darkRed}
            />
          </KeyboardAvoidingView>
        </View>
        <BottomBG color={Color.darkRed90} />
        {loading ? <SpinnerView /> : null}
        {passwordMessage && this.confirmModalRender(passwordMessage)}
      </View>
    );
  }
}
export default ChangePassword;
