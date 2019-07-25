import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Modal,
  Linking,
  Image,
  ImageBackground
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import _ from "lodash";
import moment from "moment";
import Icon, { configureFontAwesomePro } from "react-native-fontawesome-pro";
import StarRating from "react-native-star-rating";
import FIcon from "react-native-vector-icons/FontAwesome";
import { Matrics, Images, Color, Fonts } from "../../../common/styles";
import Styles from "./styles";
import {
  Header,
  DashboardModal,
  TextInputView,
  Button
} from "../../../common/components";
import ReviewModal from "../../../common/components/review-modal";
import { APICaller, Events, Helper } from "../../../util";
import Http from "../../../api/http";
import GlobalVar from "../../../global";
import Action from "../../../contact-types/action";

configureFontAwesomePro();

class Home extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(navigation, "logo", "Invite", "");

  state = {
    modalVisible: false,
    reviewModalVisible: false,
    fullName: null,
    email: null,
    phone: null,
    profileImageUrl: null,
    profileStars: null,
    achievementsArr: [],
    actionDataList: null,
    errorsMsg: null,
    reviewsArray: null,
    companyInfo: null
  };
  componentDidMount() {
    Helper.trackScreenView("HomeScreen");
    this.getAccountInfo();
    this.achievements();
    this.getReviews();
    this.getDriverCompanyInfo();
    Events.on("authNavigate", "Login", () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      });
      this.props.navigation.dispatch(resetAction);
      //this.props.navigation.navigate("Login");
    });
    // For Developer option
    Events.on("developerOption", "Dashboard", () => {
      this.getAccountInfo();
    });

    Events.on("reviewModalVisible", "Dashboard", res => {
      this.openReviewModal(false);
      this.getReviews();
    });

    Events.on("refreshProfileInfo", "Dashboard", res => {
      console.log(res);
      this.setState({
        fullName: res.full_name
      });
    });

    // // Global notification data
    // console.log("Global", global.notificationData);
    // if (global.notificationData) {
    //   this.props.navigation.navigate("JobDetail", {
    //     id: global.notificationData.offer_token
    //   });
    // }
  }

  getAccountInfo() {
    Events.trigger("loading", true);
    APICaller(`${Http.accountEndPoint}`, "GET", global.apiToken).then(json => {
      if (json) {
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
        const userInfo = json.data.data;
        this.setState({
          fullName: userInfo.full_name,
          email: userInfo.email,
          profileStars: userInfo.profile_stars,
          profileImageUrl: userInfo.profile_image_url,
          phone: userInfo.phone
        });
        GlobalVar.country = userInfo.country;
        Helper.asyncStorage("userInfo", JSON.stringify(userInfo));
        Helper.saveLanguage(userInfo.language);
        Events.trigger("loading", false);
        Events.trigger("languageSetup", userInfo.language);
        Action.getMetaOption(GlobalVar.activeStep, GlobalVar.totalStep);
        Helper.registerDeviceToken(global.fcmToken); // Register device token
      }
    });
  }

  achievements() {
    Events.trigger("loading", true);
    APICaller(`${Http.achievementsEndPoint}`, "GET", global.apiToken).then(
      json => {
        if (json) {
          if (json.status && json.status !== GlobalVar.responseSuccess) {
            const errors = json.data.errors;
            Events.trigger("toast", `${errors}`);
            return;
          }
          const achiv = json.data;
          this.setState({
            achievementsArr: achiv
          });
          Events.trigger("loading", false);
        }
      }
    );
  }

  actionList(visible, name) {
    Events.trigger("loading", true);
    APICaller(
      `${Http.achievementsEndPoint}/${name}`,
      "GET",
      global.apiToken
    ).then(json => {
      if (json) {
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
        const details = json.data.data;
        this.setState({
          actionDataList: details
        });
        Events.trigger("loading", false);
        if (details.actions.length > 0) {
          this.setModalVisible(visible);
        }
      }
    });
  }

  getReviews() {
    Events.trigger("loading", true);
    APICaller(`${Http.reviewEndPoint}`, "GET", global.apiToken).then(json => {
      if (json) {
        Events.trigger("loading", false);
        if (json.status && json.status === GlobalVar.responseInvalidCode) {
          const errors = json.data.errors;
          this.setState({
            errorsMsg: errors // set state Error message
          });
          return;
        }
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
        this.setState({
          reviewsArray: json.data
        });
      }
    });
  }

  getDriverCompanyInfo() {
    Events.trigger("loading", true);
    APICaller(`${Http.configurationEndpoint}`, "GET", global.apiToken).then(
      json => {
        if (json) {
          Events.trigger("loading", false);
          if (Helper.checkResponseStatus(json.status)) {
            this.setState({
              companyInfo: json.data.data
            });
          }
        }
      }
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  openReviewModal = visible => {
    this.setState({
      reviewModalVisible: visible
    });
  };

  firstSection = (achievementsArr, actionDataList) => (
    <View style={Styles.sectionSepView}>
      <Text style={Styles.sectionTwoTitle}>
        {Helper.translation("Home.Your awards", "Your awards")}
      </Text>
      <View style={Styles.sectionType}>
        {achievementsArr.map((res, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              Styles.sectionViewTouch,
              res.earned && Styles.earnedSections
            ]}
            onPress={() =>
              this.actionList(!this.state.modalVisible, res.identifier)
            }
            key={index.toString()}
          >
            <Icon
              name={Helper.splitIconName(res.icon)}
              color={res.earned ? Color.white : Color.black70}
              type="solid"
              size={Matrics.ScaleValue(28)}
            />
            {res.reward ? (
              <View style={Styles.earnIconStyle}>
                <Icon
                  name={Helper.splitIconName("fa-euro-sign")}
                  color={Color.white}
                  type="solid"
                  size={Matrics.ScaleValue(8)}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
      {actionDataList &&
        actionDataList.actions &&
        actionDataList.actions.length == 0 && (
          <View>
            <View style={Styles.viewStarMain}>
              <Text style={Styles.starNameText}>{actionDataList.name}</Text>
              <View style={Styles.colorMainView}>
                <Icon
                  name={"star"}
                  size={Matrics.ScaleValue(6)}
                  color={Color.white}
                  type="solid"
                />
                {actionDataList.earned_at && (
                  <Text style={Styles.textTodayDate}>
                    {moment(actionDataList.earned_at, "YYYY/MM/DD").format(
                      "DD.MM.YYYY"
                    )}
                  </Text>
                )}
              </View>
            </View>
            <Text style={Styles.descriptionText}>
              {actionDataList.description}
            </Text>
          </View>
        )}
    </View>
  );

  reviewSection = reviewsArray => (
    <View style={Styles.reviewSections}>
      <Text style={Styles.sectionTwoTitle}>
        {Helper.translation("Home.Reviews", "Reviews")}
      </Text>
      {reviewsArray.map(res => (
        <TouchableOpacity
          onPress={() => {
            this.companyId = res.company_id;
            this.openReviewModal(true);
          }}
          key={`${res.name}`}
          style={{ paddingVertical: Matrics.ScaleValue(8) }}
        >
          <Text style={Styles.writeReviewLink}>
            {Helper.translation(
              "Home.Write a review for",
              "Write a review for"
            )}{" "}
            <Text style={Styles.reviewPersonName}>
              {res.name}
              {/* Gilles & Wagner Transport GmbH. */}
            </Text>
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  askQuestionSection = () => {
    const { companyInfo } = this.state;
    const { driver_phone, driver_mail } = companyInfo;
    return (
      <View style={Styles.thirdSectionView}>
        <View style={Styles.sectionThreeTitle}>
          <FIcon
            name={"question-circle"}
            size={Matrics.ScaleValue(18)}
            color={Color.black}
          />
          <Text style={Styles.titleQuestionText}>
            {Helper.translation("Home.Any quesions?", "Any quesions?")}
          </Text>
        </View>
        <View style={Styles.callusView}>
          <Text style={Styles.justCallText}>
            {Helper.translation("Home.Just call us", "Just call us")}:{" "}
          </Text>
          <Text
            style={Styles.phoneNumberText}
            onPress={() => this.openEmail("Tel", driver_phone)}
          >
            {driver_phone}
          </Text>
        </View>
        <View style={Styles.emailView}>
          <Text style={[Styles.justCallText, Styles.viewEmail]}>
            {Helper.translation(
              "Home.Writing is better than talking? Send us your questions!",
              "Writing is better than talking? Send us your questions!"
            )}
            :{" "}
            <Text
              style={Styles.phoneNumberText}
              onPress={() => this.openEmail("Email", driver_mail)}
            >
              {driver_mail}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  openEmail(type, value) {
    if (type === "Email") {
      Linking.openURL(`mailto:${value}`);
    } else if (type === "Tel") {
      Linking.openURL(`tel:${value}`);
    }
  }

  profileSection = () => {
    const { fullName, profileImageUrl, profileStars } = this.state;
    return (
      <View style={Styles.subContainer}>
        <ImageBackground
          source={Images.profilePhoto}
          style={Styles.imagePhotoView}
        >
          <Image
            source={
              profileImageUrl ? { uri: profileImageUrl } : Images.profilePhoto
            }
            style={Styles.imagePhotoView}
          />
        </ImageBackground>
        <View style={Styles.userNameView}>
          <Text style={Styles.userNameText}>{Helper.capitalize(fullName)}</Text>
          <View style={Styles.starView}>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={Matrics.ScaleValue(15)}
              rating={profileStars}
              fullStarColor={Color.darkRed}
              starStyle={Styles.starView}
              emptyStarColor={Color.paleGreyTwo}
              iconSet={"FontAwesome"}
              emptyStar={"star"}
            />
          </View>
        </View>
      </View>
    );
  };

  navigationScreen(data, navigation) {
    if (data.link) {
      const splitD = data.link.split("/").pop();
      if (splitD === "profile") {
        navigation.navigate("Account");
      } else if (splitD === "invitations") {
        navigation.navigate("Invite");
      } else if (splitD === "job-posts") {
        navigation.navigate("Job");
      }
    }
  }

  render() {
    const {
      modalVisible,
      reviewModalVisible,
      achievementsArr,
      actionDataList,
      errorsMsg,
      reviewsArray,
      companyInfo
    } = this.state;

    const { navigation } = this.props;
    return (
      <View style={Styles.mainContainer}>
        {this.profileSection()}
        {achievementsArr && this.firstSection(achievementsArr, actionDataList)}
        {reviewsArray &&
          _.size(reviewsArray) > 0 &&
          this.reviewSection(reviewsArray)}
        {companyInfo && this.askQuestionSection()}
        <DashboardModal
          visible={modalVisible}
          closeModalReq={() => this.setModalVisible(false)}
          actionList={actionDataList}
          onPress={data => {
            this.setModalVisible(false);
            this.navigationScreen(data, navigation);
          }}
        />

        <ReviewModal
          visible={reviewModalVisible}
          closeModalReq={val => this.openReviewModal(false)}
          errorsMsg={errorsMsg}
          companyId={this.companyId}
        />
      </View>
    );
  }
}
export default Home;
