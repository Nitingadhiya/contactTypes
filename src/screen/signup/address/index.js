import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import _ from "lodash";
import FIcon from "react-native-vector-icons/FontAwesome";
import RNLocation from "react-native-location";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { Color, Images, Matrics } from "../../../common/styles";
import Styles from "./styles";
import { Events, Helper } from "../../../util";
//import Helper from "../../../util/helper";
import GooglePlaceInput from "../../../common/components/google-place-input";
import GlobalVar from "../../../global";
import { ConfirmModal } from "../../../common/components";
import RegisterObj from "../../../api/register-data";
import TypeData from "../../../api/type-data";

class GAddress extends Component {
  state = {};

  step1Lable() {
    return (
      <View>
        <Text style={Styles.addressLabel}>
          {Helper.translation("Register.Your Address", "Your Address")}
        </Text>
        <Text style={Styles.smallTextLabel}>
          {Helper.translation(
            "Register.Please enter your complete address",
            "Please enter your complete address"
          )}
          :{" "}
        </Text>
        <Text style={Styles.smallEGTextLabel}>
          {Helper.translation(
            "Register.Example: 6000 Bergenline Ave, West New York, NJ 07093 USA",
            "Example: 6000 Bergenline Ave, West New York, NJ 07093 USA"
          )}
        </Text>
      </View>
    );
  }

  selectCurrentAddress() {
    const { cAddress } = this.state;
    this.setState({
      googleaddress: cAddress
    });
    Events.trigger("useAddress", cAddress);
  }

  googlePlaceInputRender() {
    const { googleaddress, cAddress } = this.state;
    return (
      <View>
        <GooglePlaceInput googleaddress={googleaddress} />
        <View style={Styles.viewInformation}>
          <TouchableOpacity
            onPress={() => this.getCurrentLocation()}
            style={Styles.currentLocationView}
          >
            <MIcon
              name="my-location"
              color={Color.darkRed90}
              size={Matrics.ScaleValue(16)}
            />
            <Text style={Styles.currentLocationText}>
              {" "}
              {Helper.translation(
                "Register.Current location",
                "Current location"
              )}
            </Text>
          </TouchableOpacity>
          {cAddress && (
            <View style={Styles.placeInput}>
              <Text style={Styles.gAddressText}>{cAddress}</Text>
              <TouchableOpacity
                onPress={() => this.selectCurrentAddress()}
                style={Styles.useTouch}
              >
                <Text style={Styles.useTouchText}>
                  {Helper.translation("Register.Use it", "Use it")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={Styles.smallEGTextLabel}>
            {Helper.translation(
              "Register.Yer",
              "Your address will be used to automatically send you offers that are near you. In addition, you can easily calculate and display the route to your employer."
            )}
          </Text>
        </View>
      </View>
    );
  }

  getCurrentLocation() {
    RNLocation.requestPermission({
      ios: "whenInUse", // or 'always'
      android: {
        detail: "coarse", // or 'fine'
        rationale: {
          title: "We need to access your location",
          message: "We use your location to show where you are on the map",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    }).then(granted => {
      if (granted) {
        RNLocation.configure({
          distanceFilter: 10,
          desiredAccuracy: {
            ios: "best",
            android: "balancedPowerAccuracy"
          },
          // Android only
          androidProvider: "auto"
        });
        RNLocation.getLatestLocation({ timeout: 6000 }).then(latestLocation => {
          if (latestLocation) {
            let qs = `latlng=${latestLocation.latitude},${
              latestLocation.longitude
            }&key=${GlobalVar.apiKey}`;
            return fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?${qs}`
            )
              .then(res => res.json())
              .then(json => {
                if (json.status !== "OK") {
                  this.alertTitle = "Error";
                  this.alertMessage = json.error_message;
                  this.setState({
                    locationEror: true
                  });
                  return;
                  // throw new Error(`Geocode error: ${json.status}`);
                }
                const result = json.results;
                if (result) {
                  this.setState({
                    cAddress: result[0].formatted_address
                  });
                  const addressComp = result[0].address_components;

                  Helper.removeExtraData();

                  GlobalVar.country = Helper.getArrayDetails(
                    "country",
                    addressComp
                  );
                  RegisterObj.address = result[0].formatted_address;
                  Helper.addContactType();
                }
              });
          } else {
            this.alertTitle = Helper.translation("Words.Error", "Error");
            this.alertMessage = Helper.translation(
              "Register.Sorry, We are unable to find your current location",
              "Sorry, We are unable to find your current location."
            );
            this.setState({
              locationEror: true
            });
          }
        });
      }
    });
  }

  hideAlert = () => {
    this.setState({
      locationEror: false
    });
  };

  render() {
    const { locationEror } = this.state;
    return (
      <View style={Styles.mainFront}>
        {this.step1Lable()}
        {this.googlePlaceInputRender()}
        {locationEror && (
          <ConfirmModal
            title={this.alertTitle}
            message={this.alertMessage}
            rightButton={Helper.translation("Words.Ok", "Ok")}
            leaveModalReq={() => this.hideAlert()}
          />
        )}
      </View>
    );
  }
}
export default GAddress;
