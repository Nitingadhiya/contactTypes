import React, { Component } from "react";
import { View } from "react-native";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import ActionData from "../action";
import { ButtonSmall } from "../../../common/components";
import Styles from "./styles";
import GlobalVar from "../../../global";
import dataOption from "../../../data";

class StepButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeStep, totalStep } = GlobalVar;
    return (
      <View style={Styles.stepBtn}>
        {activeStep !== 1 && activeStep < totalStep - 1 && (
          <ButtonSmall
            label={Helper.translation("Words.Back", "Back")}
            customTextStyle={Styles.backBtnTextStyle}
            customStyle={Styles.backBtnStyle}
            onPress={() => ActionData.backStep()}
          />
        )}
        {activeStep < totalStep - 1 && (
          <ButtonSmall
            label={Helper.translation(
              "Register.Save and next",
              "Save and next"
            )}
            onPress={() => ActionData.saveNext()}
          />
        )}
        {activeStep === totalStep - 1 && (
          <ButtonSmall
            label={Helper.translation("Register.Ready", "Ready")}
            onPress={() => ActionData.saveNext()}
          />
        )}
      </View>
    );
  }
}

export default StepButton;
