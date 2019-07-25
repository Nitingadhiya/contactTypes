import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { get } from "lodash";
//import RNUxcam from "react-native-ux-cam";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Matrics, Color } from "../../common/styles";
import Styles from "./styles";
import Front from "./front";
import Bottom from "./bottom";
import { Header, BottomBG, SpinnerView } from "../../common/components";
//import Helper from "../../util/helper";
//import Events from "../../util/events";
import { Events, Helper } from "../../util";

class Login extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(navigation, Helper.translation("Words.Login", "Login"), "", "back");
  state = {};
  componentDidMount() {
    Helper.trackScreenView("LoginScreen");
  }
  render() {
    const { navigation } = this.props;
    const {} = this.state;
    return (
      <SafeAreaView style={Styles.mainContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={Matrics.keyboardShouldPersistTaps}
          contentContainerStyle={Styles.contentContainerStyle}
        >
          <View style={Styles.textViewStyle}>
            <Front navigation={get(this.props, "navigation", null)} />
            <Bottom
              signup={() => {
                navigation.navigate("Signup");
              }}
              forgotPassoword={() => {
                navigation.navigate("ForgotPassoword");
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <BottomBG color={Color.white} />
      </SafeAreaView>
    );
  }
}

export default Login;
