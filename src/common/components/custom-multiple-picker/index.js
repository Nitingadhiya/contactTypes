import React, { Component } from "react";
import { View, Text } from "react-native";
import SectionedMultiSelect from "../../../react-native-sectioned-multi-select";
import { Matrics, Fonts, Color, ApplicationStyles } from "../../styles";
import Styles from "./styles";
// import Helper from "../../../util/helper";
import { Helper } from "../../../util";

export const CustomMultiplePicker = ({
  multiSelectItems,
  selectedMultiItems,
  onSelectedItemsChange
}) => {
  return (
    <View style={{ marginTop: Matrics.ScaleValue(10) }}>
      <Text style={[Styles.q2Title, { marginBottom: Matrics.ScaleValue(5) }]}>
        {Helper.translation("Register.Languages", "Languages")}
      </Text>
      <SectionedMultiSelect
        items={multiSelectItems}
        uniqueKey="id"
        subKey="children"
        iconKey="icon"
        showDropDowns={false}
        selectText={Helper.translation(
          "Register.Select languages",
          "Select languages"
        )}
        expandDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={selectedMultiItems =>
          onSelectedItemsChange(selectedMultiItems)
        }
        selectedItems={selectedMultiItems}
        showCancelButton
        modalWithSafeAreaView={true}
        modalAnimationType={"slide"}
        searchPlaceholderText={Helper.translation(
          "Register.Search language",
          "Search language..."
        )}
        confirmText={Helper.translation("Words.Confirm", "Confirm")}
        styles={Styles.custom}
      />
    </View>
  );
};
