import React, { Component } from "react";
import { View } from "react-native";
import { CustomMultiplePicker } from "../../../common/components";
import dataOption from "../../../data";
import RegisterObj from "../../../api/register-data";
import ErrorComponent from "../../../common/components/error-message";
import { ErrorObj } from "../../../api";

class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiSelectItems: dataOption.multiSelectItems,
      selectedMultiItems: RegisterObj.languages
    };
  }

  onSelectedItemsChange = selectedMultiItems => {
    this.setState({ selectedMultiItems });
    RegisterObj.languages = selectedMultiItems;
    ErrorObj.languages = "";
  };

  render() {
    if (RegisterObj.languages)
      this.state.selectedMultiItems = RegisterObj.languages; // Select value display
    if (dataOption.multiSelectItems)
      this.state.multiSelectItems = dataOption.multiSelectItems; // when language change
    const { multiSelectItems, selectedMultiItems } = this.state;
    return (
      <View>
        <CustomMultiplePicker
          multiSelectItems={multiSelectItems}
          selectedMultiItems={selectedMultiItems}
          onSelectedItemsChange={selectedMultiItems =>
            this.onSelectedItemsChange(selectedMultiItems)
          }
        />
        <ErrorComponent stateName={"languages"} />
      </View>
    );
  }
}

export { Languages };
