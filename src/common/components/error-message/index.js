import React, { Component } from "react";
import { Text } from "react-native";
import { ApplicationStyles } from "../../../common/styles";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";
import { ErrorObj } from "../../../api";

class ErrorComponent extends Component {
  render() {
    const { errorsMsg, stateName } = this.props;
    if (!errorsMsg && ErrorObj[stateName]) {
      return (
        <Text
          style={[ApplicationStyles.errorMessage, ApplicationStyles.errorText]}
        >
          {ErrorObj[stateName]}
        </Text>
      );
    }
    if (!Helper.errorMessage(errorsMsg, stateName)) {
      return null;
    }

    return (
      <Text
        style={[ApplicationStyles.errorMessage, ApplicationStyles.errorText]}
      >
        {Helper.errorMessage(errorsMsg, stateName)}
      </Text>
    );
  }
}
export default ErrorComponent;
