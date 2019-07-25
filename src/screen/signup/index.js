import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import MIcon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
import I18n, { getLanguages } from "react-native-i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppEventsLogger } from "react-native-fbsdk";
import { ApplicationStyles, Matrics, Color, Images } from "../../common/styles";
import { BottomBG, LanguageModal } from "../../common/components";
import Styles from "./styles";
import BackNavigation from "../../common/components/back-navigation";
// import Uxcam from "../../util/uxcam";
import GlobalVar from "../../global";
import Components from "../../contact-types";
import Front from "./front";
import GAddress from "./address";
import StepButton from "../../contact-types/buttons/step-button";
import RegisterComponent from "../../common/components/register-component";
import RegisterObj from "../../api/register-data";
import dataOption from "../../data";
import { APICaller, Events, Helper, Uxcam } from "../../util";
import Http from "../../api/http";

let self;

class Signup extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={ApplicationStyles.headerTitleStyle}>
        {Helper.translation("Words.Register", "Register")}
      </Text>
    ),
    headerTitleStyle: ApplicationStyles.headerTitleStyle,
    headerLeft: BackNavigation(navigation, "back"),
    headerRight: (
      <TouchableOpacity
        style={ApplicationStyles.languageIconView}
        activeOpacity={1}
        onPress={() => self.changeLanguage()}
      >
        {GlobalVar.language ? (
          <Image
            source={Helper.countryFlag(GlobalVar.language)}
            style={Styles.extraFlagStyles}
          />
        ) : (
          <View style={Styles.stepBGView}>
            <MIcon name={"language"} size={18} color={Color.white} />
          </View>
        )}
      </TouchableOpacity>
    ),
    headerStyle: ApplicationStyles.headerStyle
  });

  state = {
    langModal: false,
    languageArr: [
      {
        title: Helper.translation("Words.English", "English"),
        key: "English",
        value: "en",
        checked: true
      },
      {
        title: Helper.translation("Words.German", "German"),
        value: "de",
        key: "German",
        checked: false
      },
      {
        title: Helper.translation("Words.Polish", "Polish"),
        value: "pl",
        key: "Polish",
        checked: false
      }
    ],
    lang: null,
    stepComplete: GlobalVar.stepComplete,
    activeStep: GlobalVar.activeStep,
    checkErrorValidate: null,
    noticePeriod: false,
    education: RegisterObj.education
  };
  componentDidMount() {
    self = this;
    Helper.trackScreenView("SignupScreen");
    Events.on("stepCompleteEvent", "Login", res => {
      this.setState({
        stepComplete: res.stepComplete,
        activeStep: res.activeStep
      });
      if (this.listView) {
        setTimeout(() => {
          this.listView.scrollToPosition(0, 0, { animated: true });
        }, 0);
      }
    });
    Events.on("RegisterValidate", "Register", res => {
      this.setState({
        checkErrorValidate: res
      });
    });
    Events.on("after_notice_period", "Register", res => {
      this.setState({
        noticePeriod: res
      });
    });

    Events.on("education", "Register", res => {
      this.setState({
        education: res
      });
    });

    if (GlobalVar.language) {
      this.props.navigation.setParams({
        languages: GlobalVar.language
      });
    }
  }

  registerStep(stepComplete) {
    return <Front stepComplete={stepComplete} />;
  }

  // languageTranslationOption = () => (
  //   <TouchableOpacity
  //     style={ApplicationStyles.languageIconView}
  //     activeOpacity={1}
  //     onPress={() => this.changeLanguage()}
  //   >
  //     <View style={Styles.stepBGView}>
  //       <MIcon name={"language"} size={18} color={Color.white} />
  //     </View>
  //   </TouchableOpacity>
  // );

  changeLanguage() {
    this.setState({
      langModal: !this.state.langModal
    });
    if (!this.state.langModal) {
      const { languageArr } = this.state;
      languageArr.map((res, i) => {
        if (res.value === global.currentAppLanguage) {
          languageArr[i].checked = true;
          this.languageSetup = languageArr[i].value;
        } else {
          languageArr[i].checked = false;
        }
      });
      this.setState({
        languageArr,
        lang: this.languageSetup
      });
    }
  }

  selectOption(items, index) {
    let data = items;
    items.map((res, i) => {
      if (i === index) {
        this.languageSetup = data[i].value;
        data[i].checked = true;
        this.setState({
          lang: data[i].value
        });
      } else {
        data[i].checked = false;
      }
    });
    this.setState({
      [items]: data
    });
    this.saveLanguage();
  }

  saveLanguage = () => {
    //AppEventsLogger.logEvent("Change Language", this.languageSetup);
    Events.trigger("languageSetup", this.languageSetup);
    this.setState({
      langModal: !this.state.langModal
    });
    Events.trigger("loading", true);
    APICaller(
      `${Http.optionsMetaEndPoint}/${GlobalVar.contactType}/${
        GlobalVar.country
      }?locale=${this.languageSetup}`,
      "GET",
      global.apiToken
    ).then(json => {
      if (json) {
        Helper.saveLanguage(this.languageSetup);
        this.props.navigation.setParams({
          languages: this.languageSetup
        });
        let data = json.data;
        Helper.asyncStorage("data_option", JSON.stringify(data));
        Helper.multiLanguage(data.languages);
        _.merge(dataOption, data);
        Events.trigger("loading", false);
        Events.trigger("languageSetup", this.languageSetup); // change app nvigation screen
        setTimeout(() => {
          //change language title
          const { languageArr } = this.state;
          languageArr.map((res, i) => {
            languageArr[i].title = Helper.translation(
              `Words.${res.key}`,
              res.title
            );
          });
          this.setState({
            languageArr
          });
        }, 200);
      }
    });
  };

  step1Render = () => <GAddress />;

  render() {
    const { navigation } = this.props;
    const ComponentToRender =
      Components[`${GlobalVar.contactType}-${GlobalVar.country}`];
    const {
      langModal,
      languageArr,
      stepComplete,
      activeStep,
      checkErrorValidate,
      noticePeriod,
      education
    } = this.state;
    return (
      <SafeAreaView style={Styles.mainContainer}>
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: "white" }}
          keyboardShouldPersistTaps={Matrics.keyboardShouldPersistTaps}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          ref={ref => {
            this.listView = ref;
          }}
        >
          {this.registerStep(stepComplete)}

          {activeStep === 1 && this.step1Render(activeStep)}
          {activeStep < GlobalVar.totalStep && activeStep > 1 && (
            <ComponentToRender
              navigation={navigation}
              profileStep={false}
              totalStep={GlobalVar.totalStep}
              activeStep={activeStep}
              checkErrorValidate={checkErrorValidate}
              noticePeriod={noticePeriod}
              education={education}
            />
          )}
          {activeStep === GlobalVar.totalStep && (
            <View
              style={{
                paddingHorizontal: Matrics.ScaleValue(10),
                flexWrap: "wrap"
              }}
            >
              <RegisterComponent navigation={navigation} />
            </View>
          )}
        </KeyboardAwareScrollView>
        {activeStep <= GlobalVar.totalStep && <StepButton />}

        {langModal && (
          <LanguageModal
            item={languageArr}
            closeModalReq={() => this.changeLanguage()}
            saveLanguage={() => this.saveLanguage()}
            selectOption={(items, index) => this.selectOption(items, index)}
          />
        )}
        <BottomBG color={Color.white} />
      </SafeAreaView>
    );
  }
}

export default Signup;
