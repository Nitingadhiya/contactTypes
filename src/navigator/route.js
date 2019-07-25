import { createStackNavigator } from "react-navigation";
import CampaginListScreen from "../screen/tab/dashboard";
import AccountScreen from "../screen/tab/account";
import JobScreen from "../screen/tab/job";
import OfferScreen from "../screen/tab/offer";

import SplashScreen from "../screen/splash";
import WelcomeScreen from "../screen/welcome";
import LoginScreen from "../screen/login";
import SignupScreen from "../screen/signup";
import ForgotPassowordScreen from "../screen/forgot-password";
import profileInfoScreen from "../screen/profile-info";
import editProfileScreen from "../screen/edit-profile";
import changePasswordScreen from "../screen/change-password";
import developerOptionScreen from "../screen/developer-option";
import jobDetailScreen from "../screen/job-detail";
import InviteScreen from "../screen/invite";
import MetaInfoScreen from "../screen/meta-info";

const DashboardTab = createStackNavigator({
  CampaginList: {
    screen: CampaginListScreen
  }
});

const OfferTab = createStackNavigator({
  Offer: {
    screen: OfferScreen
  }
});

const JobTab = createStackNavigator({
  Job: {
    screen: JobScreen
  }
});

const AccountTab = createStackNavigator({
  Account: {
    screen: AccountScreen
  }
});

module.exports = {
  SplashScreen,
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  ForgotPassowordScreen,
  DashboardTab,
  OfferTab,
  JobTab,
  AccountTab,
  profileInfoScreen,
  editProfileScreen,
  changePasswordScreen,
  jobDetailScreen,
  InviteScreen,
  developerOptionScreen,
  MetaInfoScreen
};
