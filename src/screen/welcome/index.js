import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Animated,
  Easing,
  BackHandler,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-fontawesome-pro";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { Events, Helper, Uxcam } from "../../util";
import { StackActions, NavigationActions } from "react-navigation";
import { Color, Images, Matrics } from "../../common/styles";
import { ConfirmModal } from "../../common/components";
import Styles from "./styles";
import BottomButton from "../../common/components/bottom-button";
import GlobalVar from "../../global";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      animatedStartValue: 0,
      v: 1,
      languages: [],
      lang: null
    };
  }

  componentWillMount() {
    Uxcam.setUserProperty("Platform", Platform.OS);
    Uxcam.logEvent("Welcome");
    //Uxcam.startRecording(); // Start screen recording
    Helper.trackScreenView("WelcomeScreen"); // Analytics
    Events.on("languageSetup", "welcome", data => {
      this.setState({
        lang: data
      });
    });
  }

  navigateToScreen(route) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  componentDidMount() {
    // this.props.navigation.navigate("Dashboard", {
    //   transition: "transitionFromBottom"
    // });
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  onDone = () => {
    this.props.navigation.navigate("Login", {
      transition: "transitionFromBottom"
    });
  };

  onBackButtonPressAndroid = () => {
    this.handleBackButtonClick();
    return true;
  };

  handleBackButtonClick = () => {
    this.alertTitle = "Exit";
    this.alertMessage = "Are you sure you want to exit?";
    const navigation = this.props.navigation;
    if (navigation.state.routeName === "Welcome") {
      this.setState({
        exitApp: true
      });
      return true;
    }
  };

  exitAppFn = params => {
    if (params) {
      BackHandler.exitApp();
      return;
    }
    this.setState({
      exitApp: false
    });
  };

  renderItem = marginLeft => (
    <View style={Styles.ScreenLogoView}>
      <Image source={Images.welcomeLogo} style={Styles.logoStyles} />
      <View style={Styles.seprator} />
      <Animated.Image
        source={Images.truckLogo}
        style={[Styles.animatedTruckStyle, { marginLeft }]}
      />
    </View>
  );

  footerRender = navigation => (
    <View style={Styles.buttonView}>
      <BottomButton
        buttonText={Helper.translation("Words.Login", "Login")}
        customStyle={Styles.loginBtn}
        color={Color.darkRed}
        onPress={() => this.navigateToScreen("Login", navigation)}
      />
      <BottomButton
        buttonText={Helper.translation("Words.Register", "Register")}
        color={Color.darkRed}
        customStyle={Styles.registerBtn}
        onPress={() => this.navigateToScreen("Signup", navigation)}
      />
    </View>
  );

  appExitModal = exitApp => {
    if (exitApp) {
      return (
        <ConfirmModal
          title={this.alertTitle}
          message={this.alertMessage}
          leftButton={Helper.translation("Words.Cancel", "Cancel")}
          rightButton={Helper.translation("Words.Ok", "Ok")}
          leaveModalReq={() => this.exitAppFn(true)}
          cancelModalReq={() => this.exitAppFn(false)}
        />
      );
    }
  };

  navigateToScreen(type, navigation) {
    navigation.navigate(type, { transition: "transitionFromBottom" });
  }

  render() {
    const { exitApp } = this.state;
    const { navigation } = this.props;
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-Matrics.screenWidth, Matrics.screenWidth]
    });
    return (
      <SafeAreaView style={Styles.mainContainer}>
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
          {/* <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DeveloperOption")}
              style={{ padding: Matrics.ScaleValue(10) }}
            >
              <Icon
                name={"cog"}
                size={Matrics.ScaleValue(22)}
                type={"solid"}
                color={Color.darkRed}
                style={{ marginRight: Matrics.ScaleValue(5) }}
              />
            </TouchableOpacity>
          </View> */}
          {this.renderItem(marginLeft)}
          {this.footerRender(navigation)}
          {this.appExitModal(exitApp)}
        </AndroidBackHandler>
      </SafeAreaView>
    );
  }
}
