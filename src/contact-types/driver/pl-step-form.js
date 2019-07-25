import React, { Component } from "react";
import { View } from "react-native";
import { Events } from "../../util";
//import Events from "../../util/events";
import { Matrics } from "../../common/styles";
import { ButtonSmall, Checkbox } from "../../common/components";
import Styles from "./styles";
import { Helper } from "../../util";
// import Helper from "../../util/helper";
import {
  Availabilities,
  NoticePeriod,
  Birthday,
  Gender,
  Languages,
  Notes,
  Satisfaction,
  WorkExperience
} from "../general/inputs";
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
} from "./inputs";
import RegisterObj from "../../api/register-data";

class StepComponent extends Component {
  state = {
    activeState: 1,
    satisfiedProfile: [
      {
        key: "agree",
        label:
          "I agree that my data will be provided to companies for the purpose of finding a potential new job and I agree to be contacted by these companies",
        checked: false
      }
    ]
  };

  componentDidMount() {
    Events.on("refreshSignup", "refresh", data => {
      this.setState({
        lang: data
      });
    });
  }

  backStep(activeState) {
    const { totalStep } = this.props;
    if (activeState === 1) {
      return;
    }
    let stepComplete = ((activeState - 1) * 100) / totalStep + "%";
    this.setState({ stepComplete, activeState: activeState - 1 });
    const stepComp = { stepComplete, activeState: activeState - 1 };
    Events.trigger("stepComplete", stepComp);
  }

  selectOption(items, index) {
    let data = items;
    items.map((res, i) => {
      if (i === index) {
        data[i].checked = true;
      } else {
        data[i].checked = false;
      }
    });
    this.setState({
      [items]: data
    });
  }

  checkboxselectOption(items, index) {
    let data = items;
    items.map((res, i) => {
      if (i === index) {
        if (data[i].checked === true) {
          data[i].checked = false;
        } else {
          data[i].checked = true;
        }
      }
    });
    this.setState({
      [items]: data
    });
  }

  step2Render = noticePeriod => (
    <View style={{ flex: 1 }}>
      <Availabilities />
      {/* For US language */}
      {noticePeriod || RegisterObj.weeks_until_exit ? <NoticePeriod /> : null}
      {/* For US language */}
      <Birthday />
      <Gender />
      <Languages />
    </View>
  );

  // step3Render = () => {
  //   return <Type />;
  // };
  step4Render = education => {
    return (
      <View style={{ flex: 1 }}>
        <Type />
        {!education ? (
          <View>
            {/* For US language */}
            {/* <LicenseClass /> */}
            {/* For US language */}
            <WorkExperience />
            {/* For DE language */}
            <Traveling />
            {/* For DE language */}
            {/* For US language */}
            {/* <RoutePreference /> */}
            {/* For US language */}
            <DayNightPreferences />
            {/* For DE language */}
            <SpecialTransport />
            {/* For DE language */}
            {/* For DE language */}
            <Tackle />
            {/* For DE language */}
          </View>
        ) : null}
      </View>
    );
  };

  step5Render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Qualifications />
        <QualificationsWant />
      </View>
    );
  };

  step6Render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Experiences />
        <ExperiencesWant />
      </View>
    );
  };

  step7Render = () => {
    return (
      <View style={{ flex: 1 }}>
        <WillingnessToMove />
        <LivingWorking />
        {/* For US language *
        <TeamDriving />
        <LeasePurchase />
        <Accidents />
        <LicenseSuspended />
        {/* For US language */}
      </View>
    );
  };

  step8Render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Notes />
        <ImportantWishes />
      </View>
    );
  };

  step9Render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Satisfaction />
      </View>
    );
  };

  render() {
    const { activeStep, noticePeriod, education } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={Styles.mainView}>
          <View style={Styles.stepDisplay} />
          {activeStep === 2 && this.step2Render(noticePeriod)}
          {/* {activeStep === 3 && this.step3Render()} */}
          {activeStep === 3 && this.step4Render(education)}
          {activeStep === 4 && this.step5Render()}
          {activeStep === 5 && this.step6Render()}
          {activeStep === 6 && this.step7Render()}
          {activeStep === 7 && this.step8Render()}
          {activeStep === 8 && this.step9Render()}
        </View>
        <View style={{ marginVertical: Matrics.ScaleValue(20) }} />
      </View>
    );
  }
}

export default StepComponent;
