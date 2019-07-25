import React, { Component } from "react";
import { View } from "react-native";
import I18n from "react-native-i18n";
import { Header } from "../../../common/components";
import Styles from "./styles";
import SegmentControl from "../../../common/components/segment";
import { Color, Images } from "../../../common/styles";
import ProfileInfo from "../../profile-info";
import MetaInfo from "../../meta-info";
import { Helper } from "../../../util";

export default class Account extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(navigation, Helper.translation("Words.Profile", "profile"));
  componentDidMount() {
    Helper.trackScreenView("AccountScreen");
  }
  render() {
    const { navigation } = this.props;
    const segments = [
      {
        title: Helper.translation("Profile.Profile", "Profile"),
        view: <ProfileInfo navigation={navigation} />
      },
      {
        title: Helper.translation("Profile.Info", "Info"),
        view: <MetaInfo navigation={navigation} />
      }
    ];
    return (
      <View style={Styles.mainContainer}>
        <SegmentControl
          segments={segments}
          color={Color.darkRed}
          textColor={Color.darkRed}
        />
      </View>
    );
  }
}
