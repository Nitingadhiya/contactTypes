import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Share,
  Clipboard,
  Image
} from "react-native";
import VersionNumber from "react-native-version-number";
import { QRCode } from "react-native-custom-qr-codes";
import Icon from "react-native-vector-icons/FontAwesome";
import { Color, Matrics, ApplicationStyles, Fonts } from "../../common/styles";
import BackNavigation from "../../common/components/back-navigation";
import Styles from "./styles";
import { APICaller, Events, Helper } from "../../util";
import Http from "../../api/http";
import GlobalVar from "../../global";

let self;
class Invite extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text style={ApplicationStyles.headerTitleStyle}>
        {Helper.translation("Words.Invite", "Invite")}
      </Text>
    ),
    headerTitleStyle: ApplicationStyles.headerTitleStyle,
    headerLeft: BackNavigation(navigation, "back"),
    headerRight: (
      <TouchableOpacity
        style={ApplicationStyles.stepView}
        activeOpacity={1}
        onPress={() => self.onShare()}
      >
        <Icon name={"share"} size={18} color={Color.black} />
      </TouchableOpacity>
    ),
    headerStyle: ApplicationStyles.headerStyle
  });

  state = {
    inviteInfo: null,
    visit_count: null,
    registration_count: null
  };

  componentDidMount() {
    self = this;
    Helper.trackScreenView("InviteScreen");
    this.getInviteDate();
  }

  getInviteDate() {
    Events.trigger("loading", true);
    APICaller(`${Http.inviteEndPoint}`, "GET", global.apiToken).then(json => {
      if (json.status && json.status === GlobalVar.responseInvalidCode) {
        const errors = json.data.errors;
        this.setState({
          errorsMsg: errors // set state Error message
        });
        Events.trigger("loading", false);
        return;
      }
      const response = json.data;
      if (response) {
        this.setState({
          inviteInfo: response,
          visit_count: response.visit_count,
          registration_count: response.registration_count
        });
      }
      Events.trigger("loading", false);
    });
  }

  onShare = async () => {
    const { inviteInfo } = this.state;
    try {
      const result = await Share.share({
        message: `${Helper.translation(
          "Words.shareContent",
          "I love Road Heroes. Use my referral link to register Road Heroes."
        )} \n ${inviteInfo.url}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  screenTitleView = () => (
    <View>
      <Text style={Styles.titleDen}>
        {Helper.translation("Words.Your invitations", "Your invitations")}
      </Text>
    </View>
  );

  showrenderItem = inviteInfo => {
    return (
      <View style={Styles.mainView}>
        <View style={Styles.subMainView}>
          <View style={Styles.linkView}>
            {inviteInfo && <Text>{inviteInfo.visit_count || 0}</Text>}
          </View>
          <Text style={Styles.linkText}>
            {Helper.translation("Words.Link visits", "Link visits")}
          </Text>
        </View>
        <View style={Styles.subMainView}>
          <View style={Styles.linkView}>
            {inviteInfo && <Text>{inviteInfo.registration_count || 0}</Text>}
          </View>
          <Text style={Styles.linkText}>
            {Helper.translation("Words.Registrations", "Registrations")}
          </Text>
        </View>
      </View>
    );
  };

  copyLinkRender = inviteInfo => (
    <View>
      <View style={Styles.copyLinkView}>
        <View style={Styles.linkTextView}>
          <Text style={Styles.textLink}>{inviteInfo.url}</Text>
        </View>
        <TouchableOpacity
          style={Styles.touchView}
          onPress={async () => {
            Clipboard.setString(`${inviteInfo.url}`);
            await Clipboard.getString(`${inviteInfo.url}`);
          }}
        >
          <Text style={Styles.copyTouchText}>
            {Helper.translation("Words.Copy Link", "Copy Link")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  qrcodeRender = inviteInfo => (
    <View style={Styles.qrCodeView}>
      <QRCode
        content={inviteInfo.url}
        size={Matrics.ScaleValue(120)}
        color={Color.black}
        backgroundColor={Color.white}
      />
    </View>
  );

  render() {
    const { inviteInfo } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {inviteInfo && (
          <ScrollView style={Styles.scrollViewStyles}>
            {this.screenTitleView()}
            {this.showrenderItem(inviteInfo)}
            {this.copyLinkRender(inviteInfo)}
            {this.qrcodeRender(inviteInfo)}
            <View
              style={{ margin: Matrics.ScaleValue(10), alignItems: "center" }}
            >
              <Text
                style={{
                  color: Color.black30,
                  fontSize: Matrics.ScaleValue(14)
                }}
              >
                App version:{" "}
                <Text style={{ fontFamily: Fonts.type.RubikBold }}>
                  {VersionNumber.appVersion}
                </Text>
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
export default Invite;
