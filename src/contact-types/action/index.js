import _ from "lodash";
import GlobalVar from "../../global";
import { APICaller, Events, Helper } from "../../util";
import { validateRegisterEndPoint, optionsMetaEndPoint } from "../../api/http";
import RegisterObj from "../../api/register-data";
import dataOption from "../../data";
import { ErrorObj } from "../../api";

class Action {
  constructor() {}
  backStep() {
    Helper.customTrackEvent("ReverseRegistrationProcessStarted");
    const totalStep = GlobalVar.totalStep;
    let activeStep = GlobalVar.activeStep;
    activeStep--;
    let stepComplete = Math.round((activeStep - 1) / (totalStep / 100)) + "%";
    const stepComp = { stepComplete, activeStep };
    Events.trigger("stepCompleteEvent", stepComp);
    GlobalVar.activeStep = activeStep;
  }

  stepProceed(totalStep, activeStep) {
    Helper.customTrackEvent(`ProfileStepsStep${activeStep}`);
    activeStep++;
    let stepComplete = Math.round((activeStep - 1) / (totalStep / 100)) + "%";
    const stepComp = { stepComplete, activeStep };
    GlobalVar.activeStep = activeStep;
    GlobalVar.stepComplete = stepComplete;
    Events.trigger("stepCompleteEvent", stepComp);
    Helper.asyncStorage("register_data", JSON.stringify(RegisterObj)); // register data save local
    Helper.asyncStorage("global_data", JSON.stringify(GlobalVar)); // register data save local
  }

  saveNext() {
    const totalStep = GlobalVar.totalStep;
    let activeStep = GlobalVar.activeStep;
    Events.trigger("loading", true);
    const extraParams = {
      contact_type: GlobalVar.contactType,
      country: GlobalVar.country,
      step: GlobalVar.activeStep
    };

    const body = Object.assign({}, RegisterObj, extraParams);
    console.log(JSON.stringify(body), "body");
    APICaller(validateRegisterEndPoint, "POST", "", body).then(json => {
      Events.trigger("loading", false);
      if (
        json &&
        json.status &&
        json.status === GlobalVar.responseInvalidCode
      ) {
        this.errorFunction(json);
        return;
      } else if (
        json &&
        json.status &&
        json.status === GlobalVar.responseSuccess
      ) {
        if (GlobalVar.activeStep === 1) {
          this.getMetaOption(totalStep, activeStep);
        } else {
          this.stepProceed(totalStep, activeStep);
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
    Events.trigger("RegisterValidate", errArr[0]);
  };

  getMetaOption(totalStep, activeStep) {
    Events.trigger("loading", true);
    // console.log(
    //   `${optionsMetaEndPoint}/${GlobalVar.contactType}/${GlobalVar.country}`
    // );
    APICaller(
      `${optionsMetaEndPoint}/${GlobalVar.contactType}/${
        GlobalVar.country
      }?locale=${GlobalVar.language}`,
      "GET",
      ""
    ).then(json => {
      Events.trigger("loading", false);
      if (json.status && json.status === GlobalVar.responseInvalidCode) {
        const errors = json.data.errors;
        this.setState({
          errorsMsg: errors // set state Error message
        });
        return;
      }
      const response = json.data;
      response.languages && Helper.multiLanguage(response.languages);
      response.day_night_preferences &&
        this.commonData(
          "day_night_preferences",
          response.day_night_preferences
        );
      response.important_wishes &&
        this.commonData("important_wishes", response.important_wishes);
      response.tackles && this.commonData("tackles", response.tackles);
      response.travelings && this.commonData("travelings", response.travelings);
      response.experiences &&
        this.commonData("experiences", response.experiences);
      response.qualifications &&
        this.commonData("qualifications", response.qualifications);
      response.qualifications &&
        this.commonData("qualifications_wanted", response.qualifications);
      response.experiences &&
        this.commonData("experiences_wanted", response.experiences);
      response.endorsements &&
        this.commonData("endorsements", response.endorsements);
      this.stepProceed(totalStep, activeStep);
      Helper.addContactType();
      Events.trigger("languageSetup", GlobalVar.language); // For meta info screen language change
    });
  }

  commonData(name, data) {
    dataOption[name] = data;
    Helper.asyncStorage("data_option", JSON.stringify(dataOption));
  }
}

export default new Action();
