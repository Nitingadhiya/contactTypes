import React, { Component } from "react";
import { View } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Button, TextInputView } from "../../../common/components";
import { Color } from "../../../common/styles";
import Styles from "./styles";
import { APICaller, Events, Helper } from "../../../util";
import Http from "../../../api/http";
import GlobalVar from "../../../global";
import ErrorComponent from "../../../common/components/error-message";

class Front extends Component {
  state = {
    email: "",
    password: "",
    errorModal: false,
    errorMsg: "",
    successModal: false,
    successMsg: "",
    loading: false,
    loginMessage: null,
    textInputArray: [
      {
        placeholder: "Email Id",
        stateName: "email",
        returnKeyType: "next",
        keyboardType: "email-address",
        nextRef: "Password",
        secureTextEntry: false,
        langType: "Login",
        passwordVisible: false
      },
      {
        placeholder: "Password",
        stateName: "password",
        returnKeyType: "done",
        keyboardType: "default",
        nextRef: "",
        secureTextEntry: true,
        langType: "Login",
        passwordVisible: true
      }
    ],
    errorsMsg: null
  };

  /* text input change */
  textInputChange = (stateVal, value) => {
    this.setState({ [stateVal]: value });
  };

  loadingView = visible => {
    this.setState({
      loading: visible
    });
  };

  /* Simple login  */
  signInFunction = navigation => {
    Events.trigger("loading", true);
    const { email, password } = this.state;
    const body = {
      email, //marco.bieling@googlemail.com
      password //password
    };
    APICaller(`${Http.loginEndPoint}`, "POST", "", body).then(json => {
      Events.trigger("loading", false);
      if (json) {
        if (json.status && json.status !== GlobalVar.responseSuccess) {
          const errors = json.data.errors;
          this.setState({
            errorsMsg: errors // set state Error message
          });
          return;
        }
        const response = json.data.data;
        Helper.asyncStorage("apiToken", response.api_token);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "TabHome" })]
        });
        this.props.navigation.dispatch(resetAction);
        //navigation.navigate("Dashboard");
      }
    });
  };

  textInput = (
    placeholder,
    stateName,
    returnKeyType,
    keyboardType,
    nextRef,
    secureTextEntry,
    value,
    langType,
    passwordVisible
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
        maxLength={40}
        onSubmitEditing={() =>
          nextRef === "Password" ? this.Password.focus() : this.Password.focus()
        }
        onChangeText={email => this.textInputChange(stateName, email)}
        Ref={r => {
          nextRef === "Password" ? (this.Password = r) : (this.Password = r);
        }}
        langType={langType}
        passwordVisible={passwordVisible}
        passwordVisibleFn={() => this.passwordVisibleFn()}
      />
      <ErrorComponent stateName={stateName} errorsMsg={this.state.errorsMsg} />
    </View>
  );

  passwordVisibleFn() {
    const { textInputArray } = this.state;
    textInputArray[1].secureTextEntry = !textInputArray[1].secureTextEntry;
    this.setState({
      textInputArray: textInputArray
    });
  }

  render() {
    const { navigation } = this.props;
    const { textInputArray } = this.state;
    return (
      <View>
        <View style={Styles.contentViewStyle}>
          {textInputArray &&
            textInputArray.map(res => {
              return this.textInput(
                res.placeholder,
                res.stateName,
                res.returnKeyType,
                res.keyboardType,
                res.nextRef,
                res.secureTextEntry,
                this.state,
                res.langType,
                res.passwordVisible
              );
            })}
        </View>

        <Button
          label={Helper.translation(`Login.Sign In`, "Sign In")}
          customStyle={Styles.signInButton}
          onPress={() => this.signInFunction(navigation)}
        />
      </View>
    );
  }
}
export default Front;
