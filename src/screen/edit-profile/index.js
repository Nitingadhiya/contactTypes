import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Text
} from "react-native";
import MIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-fontawesome-pro";
import { AppEventsLogger } from "react-native-fbsdk";
import ImagePicker from "react-native-image-crop-picker";
import {
  ActionModal,
  TextInputView,
  Header,
  BottomBG
} from "../../common/components";
import { Color, Images, Matrics, Fonts } from "../../common/styles";
import GlobalVar from "../../global";
import Styles from "./styles";
import BottomButton from "../../common/components/bottom-button";
import Http from "../../api/http";
import { APICaller, Events, Helper } from "../../util";
import RegisterObj from "../../api/register-data";
import ErrorComponent from "../../common/components/error-message";
import Action from "../../contact-types/action";

const actionOptions = ["Take Photo", "Choose from Gallery"];
const textInputRegisterArray = [
  {
    placeholder: "First Name",
    stateName: "first_name",
    returnKeyType: "next",
    keyboardType: "default",
    nextRef: "lastName",
    editable: false,
    phoneInput: false,
    langType: "Register"
  },
  {
    placeholder: "Last Name",
    stateName: "last_name",
    returnKeyType: "next",
    keyboardType: "default",
    nextRef: "phoneNumber",
    editable: false,
    phoneInput: false,
    langType: "Register"
  },
  {
    placeholder: "Phone Number",
    stateName: "phone",
    returnKeyType: "next",
    keyboardType: "phone-pad",
    nextRef: "email",
    editable: false,
    phoneInput: true,
    langType: "Register"
  },
  {
    placeholder: "Email Id",
    stateName: "email",
    returnKeyType: "done",
    keyboardType: "email-address",
    nextRef: "",
    editable: false,
    phoneInput: false,
    langType: "Register"
  }
];
class EditProfile extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(
      navigation,
      Helper.translation("Profile.Edit Profile", "Edit Profile"),
      "",
      "back"
    );

  state = {
    first_name: null,
    last_name: null,
    email: "",
    phone: "",
    language: null,
    info: "",
    actionSheet: false,
    profile_image_url: null,
    email_confirmed_at: null,
    phone_confirmed_at: null,
    profile_image_url: null,
    errorsMsg: null,
    languageModal: false,
    languageArr: [
      {
        title: Helper.translation("Words.English", "English"),
        key: "English",
        value: "en",
        checked: true
      },
      {
        title: Helper.translation("Words.German", "German"),
        value: "de",
        key: "German",
        checked: false
      },
      {
        title: Helper.translation("Words.Polish", "Polish"),
        value: "pl",
        key: "Polish",
        checked: false
      }
    ]
  };

  componentDidMount() {
    Helper.trackScreenView("EditProfileScreen");
    this.imageObject = null;
    const {
      first_name,
      last_name,
      email,
      email_confirmed_at,
      phone,
      phone_confirmed_at,
      profile_image_url,
      phone_country_code,
      language
    } = this.props.navigation.state.params.data;
    if (first_name) {
      RegisterObj.phone_country_code = phone_country_code;
      this.setState({
        first_name,
        last_name,
        phone,
        phone_confirmed_at,
        email,
        email_confirmed_at,
        profile_image_url,
        language
      });
    }
  }
  uploadPhotoImage() {
    let media = this.imageObject;
    var formData = new FormData();
    formData.append("image", media);
    // axios(`${Http.uploadPhoto}`, {
    //   method: "post",
    //   headers: {
    //     "content-type": "multipart/form-data",
    //     Authorization: `Bearer ${global.apiToken}`
    //   },
    //   body: formData
    // })
    //   .then(function(r) {
    //     console.log("Success", r);
    //   })
    //   .catch(function(e) {
    //
    //     //console.log("Error", e.response.data.errors.image[0]);
    //   })
    //   .done();
    fetch(`${Http.uploadPhoto}`, {
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${global.apiToken}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        const userInfo = responseJson.data;
        Events.trigger("refreshProfileInfo", userInfo);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateAccountInfo() {
    if (this.imageObject) {
      this.uploadPhotoImage();
    }
    Events.trigger("loading", true);
    const { email, first_name, last_name, phone, language } = this.state;
    const body = {
      first_name,
      last_name,
      email,
      phone_country_code: RegisterObj.phone_country_code || "DE",
      phone: RegisterObj.phone || phone,
      language: language || "DE"
    };

    APICaller(`${Http.accountEndPoint}`, "PUT", global.apiToken, body).then(
      json => {
        if (json) {
          if (json.status && json.status === GlobalVar.responseInvalidCode) {
            const errors = json.data.errors;
            this.setState({
              errorsMsg: errors // set state Error message
            });
            return;
          }
          Helper.saveLanguage(language);
          Action.getMetaOption(GlobalVar.activeStep, GlobalVar.totalStep);
          const userInfo = json.data.data;
          this.setState({
            fullName: userInfo.full_name,
            email: userInfo.email,
            language: userInfo.language,
            profileStars: userInfo.profile_stars,
            profile_image_url: userInfo.profile_image_url,
            phone: userInfo.phone
          });

          Events.trigger("refreshProfileInfo", userInfo);
          AppEventsLogger.logEvent("Change Language", userInfo.language);
          Events.trigger("languageSetup", userInfo.language); // All screen refresh(Language change)
          Events.trigger("loading", false);
          this.props.navigation.navigate("Account");
        }
      }
    );
  }

  /* text input change */
  textInputChange = (stateVal, value) => {
    this.setState({ [stateVal]: value });
  };

  userPhototEdit = pPhoto => (
    <View style={Styles.userImageView}>
      <TouchableOpacity
        style={Styles.editPhotoTouch}
        onPress={() => this.showActionSheet()}
      >
        <View
          style={{
            height: Matrics.ScaleValue(30),
            width: Matrics.ScaleValue(30),
            borderRadius: Matrics.ScaleValue(20),
            backgroundColor: Color.darkRed90,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MIcon name={"edit"} size={20} color={Color.white} />
        </View>
      </TouchableOpacity>
      <Image
        source={
          pPhoto
            ? {
                uri: pPhoto
              }
            : Images.profile_image_url
        }
        style={Styles.profilePhotoCss}
      />
    </View>
  );

  textInputEdit = () => (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: Matrics.ScaleValue(10) }}>
        {textInputRegisterArray &&
          textInputRegisterArray.map(res => {
            return this.textInput(
              res.placeholder,
              res.stateName,
              res.returnKeyType,
              res.keyboardType,
              res.nextRef,
              this.state,
              res.editable,
              res.phoneInput,
              res.langType
            );
          })}
      </View>
    </View>
  );

  editableFn(stateName) {
    if (stateName === "email" && this.state.email_confirmed_at) {
      return true;
    }
    if (stateName === "phone" && this.state.phone_confirmed_at) {
      return true;
    }
    return false;
  }

  textInput = (
    placeholder,
    stateName,
    returnKeyType,
    keyboardType,
    nextRef,
    value,
    editable,
    phoneInput,
    langType
  ) => (
    <View key={`${nextRef}_Text`}>
      <TextInputView
        placeholder={placeholder}
        placeholderTextColor={Color.silver}
        placeholderStyle={Styles.placeholderStyle}
        style={Styles.textInput}
        value={value[stateName]}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        maxLength={40}
        editable={this.editableFn(stateName)}
        phoneInput={phoneInput}
        onSubmitEditing={() =>
          nextRef === "Password" ? this.Password.focus() : this.Password.focus()
        }
        onChangeText={email => this.textInputChange(stateName, email)}
        Ref={r => {
          nextRef === "Password" ? (this.Password = r) : (this.Password = r);
        }}
        langType={langType}
      />
      <ErrorComponent stateName={stateName} errorsMsg={this.state.errorsMsg} />
    </View>
  );

  /* text input change */
  textInputChange = (stateVal, value) => {
    this.setState({ [stateVal]: value });
  };

  // render action sheet
  actionSheet = () => (
    <ActionModal
      actionOptions={actionOptions}
      onPress={text => this.actionPress(text)}
    />
  );

  /* show action sheet */
  showActionSheet() {
    this.setState({
      actionSheet: true
    });
  }

  actionPress(text) {
    this.setState({
      actionSheet: false
    });

    setTimeout(() => {
      if (text === 1) {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          mediaType: "photo"
          // cropping: true
        }).then(image => {
          this.filename = image.filename;
          this.type = image.mime;
          this.uri = image.sourceURL;
          this.imageObject = {
            uri: image.path,
            type: image.mime,
            name: image.filename || image.path.split("/").pop(),
            size: image.size
          };
          this.setState({
            profile_image_url: image.path
          });
        });
      }
      if (text === 0) {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          //cropping: true,
          mediaType: "photo"
        }).then(image => {
          this.imageObject = {
            uri: image.path,
            type: image.mime,
            name: image.filename || image.path.split("/").pop(),
            size: image.size
          };
          this.setState({
            profile_image_url: image.path
          });
        });
      }
    }, 500);
  }

  setLanguageFn() {
    this.setState({
      languageModal: !this.state.languageModal
    });
  }

  setLanguage() {
    const { languageModal, language } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: Matrics.screenWidth - Matrics.ScaleValue(30),
          height: Matrics.ScaleValue(45)
        }}
        onPress={() => this.setLanguageFn()}
      >
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: Color.paleGreyTwo,
            justifyContent: "space-between",
            paddingHorizontal: Matrics.ScaleValue(10),
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: Color.black30,
              fontSize: Matrics.ScaleValue(16),
              fontFamily: Fonts.type.Rubik
            }}
          >
            {Helper.pronounce(language)}
          </Text>
          <Icon
            name={!languageModal ? "caret-down" : "caret-up"}
            size={Matrics.ScaleValue(28)}
            color={Color.darkRed}
          />
        </View>
      </TouchableOpacity>
    );
  }

  chooseLanguage(language) {
    this.setState({
      language,
      languageModal: false
    });
  }

  listOfLanguage() {
    const { languageArr, language } = this.state;
    return (
      <View
        style={{
          width: Matrics.screenWidth - Matrics.ScaleValue(30),
          borderWidth: 1,
          borderColor: Color.paleGreyTwo,
          paddingHorizontal: Matrics.ScaleValue(10),
          borderTopWidth: 0
        }}
      >
        {languageArr.map(res => (
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: Color.paleGreyTwo,
              flexDirection: "row",
              alignItems: "center",
              height: Matrics.ScaleValue(45),
              justifyContent: "space-between"
            }}
            key={`${res.value}`}
            onPress={() => this.chooseLanguage(res.value)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={Helper.countryFlag(res.value)}
                style={Styles.flagStyles}
              />
              <Text
                style={{
                  color: Color.black30,
                  fontSize: Matrics.ScaleValue(16),
                  fontFamily: Fonts.type.Rubik
                }}
              >
                {res.key}
              </Text>
              <Text
                style={{
                  color: Color.black30,
                  fontSize: Matrics.ScaleValue(12),
                  fontFamily: Fonts.type.Rubik
                }}
              >
                {" "}
                ({res.title})
              </Text>
            </View>
            {language === res.value && (
              <Icon
                name="check"
                size={Matrics.ScaleValue(18)}
                color={Color.darkRed}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  render() {
    const {
      actionSheet,
      profile_image_url,
      languageModal,
      language
    } = this.state;
    return (
      <View style={Styles.textViewStyle}>
        <View style={Styles.modalViewContainer}>
          <KeyboardAvoidingView
            behavior={GlobalVar.keyboardBehavior()}
            keyboardVerticalOffset={GlobalVar.verticalOffset()}
            style={Styles.keyboardScroll}
          >
            <ScrollView style={Styles.viewContainer}>
              <View style={Styles.modalBody}>
                {this.userPhototEdit(profile_image_url)}
                {this.textInputEdit()}
                {this.setLanguage()}
                {languageModal && language && this.listOfLanguage()}
                <View
                  style={{
                    height: Matrics.ScaleValue(50),
                    width: Matrics.screenWidth - Matrics.ScaleValue(20)
                  }}
                />
                {/* {this.applanguage()} */}
              </View>
            </ScrollView>
            <BottomButton
              onPress={() => this.updateAccountInfo()}
              buttonText={Helper.translation("Words.Update", "Update")}
              color={Color.darkRed}
            />
          </KeyboardAvoidingView>
        </View>
        <BottomBG color={Color.darkRed90} />
        {actionSheet && this.actionSheet()}
      </View>
    );
  }
}
export default EditProfile;
