import React, { Component } from "react";
import { View, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import { Matrics, Color } from "../../common/styles";
import { ConfirmModal, Checkbox } from "../../common/components";
import BottomButton from "../../common/components/bottom-button";
import Styles from "./styles";
import { APICaller, Events, Helper } from "../../util";
import GAddress from "../signup/address";
import {
  Availabilities,
  NoticePeriod,
  Birthday,
  Gender,
  Languages,
  Notes,
  Satisfaction,
  WorkExperience
} from "../../contact-types/general/inputs";
import {
  Accidents,
  DayNightPreferences,
  Endorsements,
  ExperiencesWant,
  Experiences,
  ImportantWishes,
  LeasePurchase,
  LicenseClass,
  LicenseSuspended,
  LivingWorking,
  TeamDriving,
  Type,
  RoutePreference,
  Qualifications,
  QualificationsWant,
  WillingnessToMove,
  Traveling,
  SpecialTransport,
  Tackle
} from "../../contact-types/driver/inputs";
import GlobalVar from "../../global";
import Front from "../signup/front";
import Http from "../../api/http";
import RegisterObj from "../../api/register-data";
import dataOption from "../../data";
import { ErrorObj } from "../../api/error-data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class MetaInfo extends Component {
  state = {
    noticePeriod: false,
    education: false,
    userInfo: null,
    showModal: false,
    agreement: [
      {
        key: "agree",
        label:
          "I agree that my data will be provided to companies for the purpose of finding a potential new job and I agree to be contacted by these companies",
        checked: false
      }
    ],
    metaFetch: false,
    refreshing: false
  };
  componentDidMount() {
    Helper.trackScreenView("MetaInfoScreen");
    AsyncStorage.getItem("userInfo").then(res => {
      const userInfo = JSON.parse(res);
      this.setState({
        userInfo: userInfo
      });
    });
    Events.on("after_notice_period", "profile", res => {
      this.setState({
        noticePeriod: res
      });
    });
    this.fetchProfileInfo();
    // For Developer option
    Events.on("developerOption", "Meta info", () => {
      this.fetchProfileInfo();
    });

    Events.on("education", "Meta info", res => {
      this.setState({ education: res });
    });

    Events.on("metaInfoUpdate", "meta Info", res => {
      this.setState({
        userInfo: res
      });
    });
  }

  fetchProfileInfo = () => {
    Events.trigger("loading", true);
    APICaller(`${Http.profileEndPoint}`, "GET", global.apiToken).then(json => {
      if (json) {
        console.log(json);
        const data = json.data.data;
        const datakeys = Object.keys(data);
        Helper.SaveRegisterValue(datakeys, data);
        if (data.birthday) {
          const bday = data.birthday.split("-");
          RegisterObj.birthday_day = bday[0];
          RegisterObj.birthday_month = bday[1];
          RegisterObj.birthday_year = bday[2];
        }
        if (RegisterObj.qualifications) {
          dataOption.qualifications_wanted = _.filter(
            dataOption.qualifications,
            option => !RegisterObj.qualifications.includes(option.key)
          );
        }

        if (data.weeks_until_exit) {
          // RegisterObj.weeks_until_exit = data.weeks_until_exit;
          this.setState({
            noticePeriod: true
          });
        }
        Events.trigger("useAddress", data.address);
        Events.trigger("loading", false);
        this.setState({
          metaFetch: true,
          education: data.education,
          refreshing: false
        });
      }
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchProfileInfo();
  };

  agreement() {
    const { agreement } = this.state;
    return (
      <View
        style={{
          marginTop: Matrics.ScaleValue(10)
        }}
      >
        <Checkbox
          items={agreement}
          title={""}
          stateName="agreement"
          onPress={val => {
            Helper.checkboxselectOption("agreement", val);
            this.setState({
              agreement
            });
            this.acceptTerms();
          }}
          langType="Register"
          mainView={{ width: Matrics.screenWidth - Matrics.ScaleValue(40) }}
          customOptionStyle={{ fontSize: Matrics.ScaleValue(14) }}
        />
      </View>
    );
  }

  acceptTerms() {
    APICaller(`${Http.acceptTerms}`, "POST", global.apiToken, "").then(json => {
      Helper.customTrackEvent("ProfileStepsStep12");
      //console.log("json accept", json);
    });
  }

  updateView() {
    return (
      <BottomButton
        buttonText={Helper.translation("Words.Update", "Update")}
        color={Color.darkRed}
        onPress={() => this.checkProfileInformation()}
      />
    );
  }

  checkProfileInformation() {
    if (RegisterObj.agreement.length === 0) {
      this.setState({
        showModal: true
      });
    } else {
      this.updateRequest();
    }
  }

  updateRequest() {
    this.setState({
      showModal: false
    });
    Events.trigger("loading", true);
    APICaller(
      `${Http.profileEndPoint}`,
      "PUT",
      global.apiToken,
      RegisterObj
    ).then(json => {
      if (json) {
        Events.trigger("loading", false);
        Events.trigger("toast", `${json.data.message}`);
        Events.trigger("acceptTerms"); //trigger update profile information
        if (json.status && json.status === GlobalVar.responseInvalidCode) {
          this.errorFunction(json);
          return;
        } else if (json.status && json.status === GlobalVar.responseSuccess) {
          if (json.data && json.data.data) {
            Helper.asyncStorage(
              "register_data",
              JSON.stringify(json.data.data)
            ); // register data save local
          }
        }
      }
    });
  }

  errorFunction = json => {
    const errors = json.data.errors;
    const errArr = Object.keys(errors);

    errArr.map(res => {
      //ErrorObj[res] = Helper.errorMessage(errors, res);
      ErrorObj[res] = errors[res][0];
    });
    this.setState({
      tempState: true
    });
  };

  usForm = (noticePeriod, education) => (
    <View style={Styles.formView}>
      <GAddress />
      <View style={Styles.viewAvl}>
        <Availabilities />
        {this.hrTag()}
        {noticePeriod ? <NoticePeriod /> : null}
        <Birthday />
        <Gender />
        {this.hrTag()}
        <Languages />
        <View style={Styles.sepreateLine} />
        <Type />
        {!education ? (
          <View>
            <LicenseClass />
            {this.hrTag()}
            <WorkExperience />
            <RoutePreference />
            {this.hrTag()}
            <DayNightPreferences />
            {this.hrTag()}
          </View>
        ) : null}
        <Qualifications />
        {this.hrTag()}
        <QualificationsWant />
        {this.hrTag()}
        <Experiences />
        {this.hrTag()}
        <ExperiencesWant />
        {this.hrTag()}
        <WillingnessToMove />
        {this.hrTag()}
        <LivingWorking />

        <TeamDriving />
        {this.hrTag()}
        <LeasePurchase />
        {this.hrTag()}
        <Accidents />
        {this.hrTag()}
        <LicenseSuspended />
        {this.hrTag()}
        <Notes />
        <Endorsements />
        {this.hrTag()}
        <Satisfaction />
        {this.agreement()}
      </View>
    </View>
  );
  deForm = (noticePeriod, education) => (
    <View style={Styles.formView}>
      <GAddress />
      <View style={Styles.viewAvl}>
        {noticePeriod ? <NoticePeriod /> : null}
        <Availabilities />
        {this.hrTag()}
        <Birthday />
        <Gender />
        {this.hrTag()}
        <Languages />
        <WorkExperience />
        <LivingWorking />
        <Notes />
        <Satisfaction />
        <View style={Styles.sepreateLine} />
        <Type />
        <WillingnessToMove />
        {!education ? (
          <View>
            <Traveling />
            {this.hrTag()}
            <DayNightPreferences />
            {this.hrTag()}
            <SpecialTransport />
            {this.hrTag()}
            <Tackle />
            {this.hrTag()}
            <Qualifications />
            {this.hrTag()}
            <Experiences />
            {this.hrTag()}
          </View>
        ) : null}

        <QualificationsWant />
        {this.hrTag()}
        <ExperiencesWant />
        {this.hrTag()}
        <ImportantWishes />

        {this.agreement()}
      </View>
    </View>
  );

  hrTag = () => (
    <View
      style={{
        width: Matrics.screenWidth - Matrics.ScaleValue(30),
        borderColor: Color.paleGreyTwo,
        height: Matrics.ScaleValue(1),
        backgroundColor: Color.paleGrey,
        marginVertical: Matrics.ScaleValue(5)
      }}
    />
  );

  profileCompleted = userInfo => (
    <Front
      stepComplete={`${userInfo.profile_progress_percentage}%`}
      profileScreen={true}
      firstName={userInfo.first_name}
      emailAddress={userInfo.email_confirmed_at}
      phoneNumber={userInfo.phone_confirmed_at}
      Fillprofile={userInfo.profile_completed}
      contactInfo={true}
    />
  );

  cancelModalReq = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      noticePeriod,
      education,
      userInfo,
      showModal,
      agreement,
      metaFetch
    } = this.state;
    return (
      <View style={Styles.mainContainer}>
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: "white" }}
          keyboardShouldPersistTaps={Matrics.keyboardShouldPersistTaps}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {userInfo && this.profileCompleted(userInfo)}
          {GlobalVar.country == "US" &&
            metaFetch &&
            this.usForm(noticePeriod, education)}
          {(GlobalVar.country == "DE" || GlobalVar.country == "PL") &&
            metaFetch &&
            this.deForm(noticePeriod, education)}
          <View style={{ marginVertical: Matrics.ScaleValue(20) }} />
        </KeyboardAwareScrollView>
        {this.updateView()}
        {showModal && (
          <ConfirmModal
            title={Helper.translation(
              "Words.Share Contact Information",
              "Share Contact Information"
            )}
            message={Helper.translation(
              "Register.I agree that my data will be provided to companies for the purpose of finding a potential new job and I agree to be contacted by these companies",
              "I agree that my data will be provided to companies for the purpose of finding a potential new job and I agree to be contacted by these companies"
            )}
            leftButton={Helper.translation("Words.Abort, stop", "Abort, stop")}
            rightButton={Helper.translation("Words.Save", "Save")}
            leaveModalReq={() => this.updateRequest()}
            cancelModalReq={() => this.cancelModalReq()}
          />
        )}
      </View>
    );
  }
}

export default MetaInfo;
