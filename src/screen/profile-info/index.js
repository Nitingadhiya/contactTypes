import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ImageBackground
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { Images, ApplicationStyles, Matrics, Color } from "../../common/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ConfirmModal, ButtonSmall } from "../../common/components";
import Styles from "./styles";
import BackNavigation from "../../common/components/back-navigation";
import ListViewOptions from "../../common/components/list-view-options";
// import Helper from "../../util/helper";
import Http from "../../api/http";
import { APICaller, Events, Helper } from "../../util";
import Front from "../signup/front";
import RegisterObj from "../../api/register-data";
import GlobalVar from "../../global";

const listOfItemArr = [
  {
    key: "changePassword",
    value: "Change Password",
    navigate: true
  },
  // {
  //   key: "developerOption",
  //   value: "Developer Option",
  //   navigate: true
  // },
  {
    key: "logout",
    value: "Log out",
    navigate: false
  }
  // {
  //   key: "deleteAccount",
  //   value: "Delete Account",
  //   customTextStyle: Color.darkRed,
  //   navigate: false
  // }
];
class ProfileInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile Info",
      headerTitleStyle: ApplicationStyles.headerTitleStyle,
      headerLeft: BackNavigation(navigation, "back"),
      headerRight: (
        <TouchableOpacity
          style={Styles.editTouch}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={Styles.editText}>Edit</Text>
        </TouchableOpacity>
      ),
      headerStyle: ApplicationStyles.headerStyle
    };
  };

  state = {
    confirmActive: false,
    deleteActive: false,
    fullName: null,
    email: null,
    phone: null,
    profileImageUrl: null,
    userInfo: null,
    refreshing: false
  };

  componentDidMount() {
    Helper.trackScreenView("ProfileInfoScreen");
    this.fetchAccountInfo();
    Events.on("refreshProfileInfo", "Profile", res => {
      this.changeState(res);
    });
    // For Developer option
    Events.on("developerOption", "Profile", () => {
      this.fetchAccountInfo();
    });

    Events.on("acceptTerms", "profile", () => {
      this.state.userInfo.accepted_terms_at = this.state.userInfo
        .accepted_terms_at
        ? null
        : new Date();

      this.setState({
        userInfo: this.state.userInfo
      });
    });
  }

  fetchAccountInfo() {
    Events.trigger("loading", true);
    APICaller(`${Http.accountEndPoint}`, "GET", global.apiToken).then(json => {
      if (json && json.data) {
        if (json.status && json.status !== GlobalVar.responseSuccess) {
          Events.trigger(
            "toast",
            Helper.translation(
              `Words.${GlobalVar.requestFailedMsg}`,
              GlobalVar.requestFailedMsg
            )
          );
          return;
        }
        let userInfo = json.data.data;
        this.changeState(userInfo);
        Events.trigger("metaInfoUpdate", userInfo);
        Events.trigger("loading", false);
      }
    });
  }

  changeState(userInfo) {
    RegisterObj.agreement = userInfo.accepted_terms_at ? ["agree"] : [];
    this.setState({
      userInfo,
      fullName: userInfo.full_name,
      email: userInfo.email,
      language: userInfo.language,
      profileStars: userInfo.profile_stars,
      profileImageUrl: userInfo.profile_image_url,
      phone: userInfo.phone,
      refreshing: false
    });
  }

  screenNavigation = screenNav => {
    if (screenNav === "changePassword") {
      this.props.navigation.navigate("ChangePassword");
    } else if (screenNav === "logout") {
      this.setState({
        confirmActive: true
      });
    } else if (screenNav === "deleteAccount") {
      this.setState({
        deleteActive: true
      });
    } else if (screenNav === "developerOption") {
      this.props.navigation.navigate("DeveloperOption");
    }
  };

  confirmProfile(type) {
    Events.trigger("loading", true);
    const endpoint =
      type === "email"
        ? `${Http.confirmEmailEndPoint}`
        : `${Http.confirmPhoneEndPoint}`;

    APICaller(endpoint, "POST", global.apiToken).then(json => {
      if (json) {
        const message = json.data.message;
        Events.trigger("loading", false);
        Events.trigger("toast", `${message}`);
      }
    });
  }

  userdetailsView = userInfo => {
    const { fullName, phone, language, email } = this.state;
    return (
      <View style={Styles.userDetails}>
        <Text style={Styles.usernameText}>{Helper.capitalize(fullName)}</Text>
        {language && (
          <Text style={Styles.language}>({Helper.pronounce(language)})</Text>
        )}
        <View style={Styles.viewCombine}>
          <Text style={Styles.usernameEmail}>{email}</Text>
          {userInfo.email_confirmed_at && (
            <Icon
              name={"check-circle"}
              size={Matrics.ScaleValue(15)}
              color={Color.parrot}
              style={{ marginLeft: Matrics.ScaleValue(5) }}
            />
          )}
        </View>
        <View style={Styles.viewCombine}>
          <Text style={Styles.usernameMobileNo}>{phone}</Text>
          {userInfo.phone_confirmed_at && (
            <Icon
              name={"check-circle"}
              size={Matrics.ScaleValue(15)}
              color={Color.parrot}
              style={{ marginLeft: Matrics.ScaleValue(5) }}
            />
          )}
        </View>
        <View style={Styles.emailView}>
          {!userInfo.email_confirmed_at && (
            <TouchableOpacity
              onPress={() => this.confirmProfile("email")}
              style={Styles.touchButton}
            >
              <Text style={Styles.confirmText}>
                {Helper.translation("Profile.Confirm Email", "Confirm Email")}
              </Text>
            </TouchableOpacity>
          )}
          {!userInfo.phone_confirmed_at && (
            <TouchableOpacity
              onPress={() => this.confirmProfile("phone")}
              style={Styles.touchButton}
            >
              <Text style={Styles.confirmText}>
                {Helper.translation("Profile.Confirm Phone#", "Confirm Phone#")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  userdetailsDecription = () => (
    <View style={Styles.userDescView}>
      <Text style={Styles.userDescText}>
        The Centers for Disease Control & Prevention (CDC) on Saturday began
        distributing cards at airports receiving flights returning directly from
        Hong Kong warning travelers returning to the United States from Hong
        Kong & Guangdong Province.
      </Text>
    </View>
  );

  userImage = profile_image_url => (
    <View style={Styles.userImageView}>
      <ImageBackground source={Images.profilePhoto} style={Styles.userImage}>
        <Image
          source={
            profile_image_url ? { uri: profile_image_url } : Images.profilePhoto
          }
          style={Styles.userImage}
        />
      </ImageBackground>
    </View>
  );

  logoutOption = () => (
    <View style={Styles.logoutView}>
      <TouchableOpacity style={Styles.logoutTouch}>
        <Text style={Styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.logoutTouch}>
        <Text style={Styles.logoutText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );

  confirmModalRender = () => (
    <ConfirmModal
      title={"Log out"}
      message={"Are you sure you want to Log out?"}
      leftButton={"Cancel"}
      rightButton={"Log out"}
      leaveModalReq={() => this.logoutScreen()}
      cancelModalReq={() => this.cancelModalReq()}
    />
  );

  deleteModalRender = () => (
    <ConfirmModal
      title={"Delete"}
      message={"Are you sure you want to Delete Account?"}
      leftButton={"Cancel"}
      rightButton={"Delete"}
      leaveModalReq={() => this.deleteAccount()}
      cancelModalReq={() => this.cancelModalReq()}
    />
  );

  cancelModalReq = () => {
    this.setState({
      confirmActive: false,
      deleteActive: false
    });
  };
  logoutScreen = () => {
    Helper.removeAsyncStorage("apiToken");
    global.apiToken = "";
    Helper.clearStorage();
    this.setState({
      confirmActive: false
    });
    const reg = Object.keys(RegisterObj);
    reg.map(res => {
      if (typeof RegisterObj[res] === "object") {
        RegisterObj[res] = [];
      } else if (typeof RegisterObj[res] === "string") {
        RegisterObj[res] = "";
        if (res === "phone_country_code") {
          RegisterObj[res] = "de";
        }
      } else if (typeof RegisterObj[res] === "number") {
        RegisterObj[res] = 0;
      }
      GlobalVar.activeStep = 1;
      GlobalVar.stepComplete = "0%";
      //delete RegisterObj[res];
    });

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Welcome" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  deleteAccount = () => {
    this.setState({
      deleteActive: false
    });
  };
  profileCompleted = userInfo => (
    <Front
      stepComplete={`${userInfo.profile_progress_percentage}%`}
      profileScreen={true}
      firstName={userInfo.first_name}
      emailAddress={userInfo.email_confirmed_at}
      phoneNumber={userInfo.phone_confirmed_at}
      Fillprofile={userInfo.profile_completed}
      contactInfo={userInfo.accepted_terms_at ? true : false}
    />
  );

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchAccountInfo();
  };

  render() {
    const { navigation } = this.props;
    const { confirmActive, deleteActive, userInfo } = this.state;
    return (
      <ScrollView
        style={Styles.mainContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        {userInfo && this.profileCompleted(userInfo)}
        <View style={Styles.contentView}>
          {userInfo && this.userImage(userInfo.profile_image_url)}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfile", { data: userInfo })
            }
            style={{
              position: "absolute",
              zIndex: 1,
              right: 0,

              flexDirection: "row",
              padding: Matrics.ScaleValue(10)
            }}
          >
            <Icon
              name="edit"
              color={Color.darkRed90}
              size={Matrics.ScaleValue(12)}
            />
            <Text style={Styles.editText}>
              {Helper.translation("Profile.Edit", "Edit")}
            </Text>
          </TouchableOpacity>
          {userInfo && this.userdetailsView(userInfo)}
        </View>
        <View style={Styles.profileContentView}>
          <ListViewOptions
            title={listOfItemArr}
            onPress={screenNav => this.screenNavigation(screenNav)}
          />
        </View>
        {confirmActive && this.confirmModalRender()}
        {deleteActive && this.deleteModalRender()}
      </ScrollView>
    );
  }
}

export default ProfileInfo;
