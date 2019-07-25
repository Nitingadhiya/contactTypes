import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  Easing
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";
import AIcon from "react-native-vector-icons/AntDesign";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DashboardTab,
  OfferTab,
  JobTab,
  AccountTab,
  SplashScreen,
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  ForgotPassowordScreen,
  profileInfoScreen,
  editProfileScreen,
  changePasswordScreen,
  jobDetailScreen,
  InviteScreen,
  developerOptionScreen,
  MetaInfoScreen
} from "./route";

import {
  Images,
  Color,
  Fonts,
  Matrics,
  ApplicationStyles
} from "../common/styles";
import { Helper } from "../util";
//import Helper from "../util/helper";

const styles = {
  tabLabel: {
    fontSize: 10,
    color: Color.black70,
    textAlign: "center"
  },
  tabTextColor: {
    fontSize: 10,
    color: Color.darkRed,
    textAlign: "center"
  }
};

const TabNavigation = createMaterialTopTabNavigator(
  {
    Dashboard: {
      screen: DashboardTab,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: ({ focused }) => (
            <View>
              <Text style={focused ? styles.tabTextColor : styles.tabLabel}>
                {Helper.translation("Words.Home", "Home")}
              </Text>
            </View>
          ),
          tabBarVisible:
            navigation.state.params && navigation.state.params.tabBarVisible,
          tabBarIcon: ({ focused }) => (
            <AIcon
              name={"home"}
              color={focused ? Color.darkRed : Color.black}
              size={25}
            />
          )
        };
      }
    },
    Job: {
      screen: JobTab,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: ({ focused }) => (
            <View>
              <Text style={focused ? styles.tabTextColor : styles.tabLabel}>
                {Helper.translation("Words.Job", "Job")}
              </Text>
            </View>
          ),
          tabBarVisible:
            navigation.state.params && navigation.state.params.tabBarVisible,
          tabBarIcon: ({ focused }) => (
            <MIcon
              name={"format-list-bulleted"}
              color={focused ? Color.darkRed : Color.black}
              size={25}
            />
          )
        };
      }
    },
    Offer: {
      screen: OfferTab,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: ({ focused }) => (
            <View>
              <Text style={focused ? styles.tabTextColor : styles.tabLabel}>
                {Helper.translation("Words.Offer", "Offer")}
              </Text>
            </View>
          ),
          tabBarVisible:
            navigation.state.params && navigation.state.params.tabBarVisible,
          tabBarIcon: ({ focused }) => (
            <AIcon
              name={"tags"}
              color={focused ? Color.darkRed : Color.black}
              size={25}
            />
          )
        };
      }
    },
    Account: {
      screen: AccountTab,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: ({ focused }) => (
            <View>
              <Text style={focused ? styles.tabTextColor : styles.tabLabel}>
                {Helper.translation("Words.Profile", "Profile")}
              </Text>
            </View>
          ),
          tabBarVisible:
            navigation.state.params && navigation.state.params.tabBarVisible,
          tabBarIcon: ({ focused }) => (
            <MIcon
              name={"account"}
              color={focused ? Color.darkRed : Color.black}
              size={25}
            />
          )
        };
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      height: 50,
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 5,
        ...ifIphoneX(
          {
            marginBottom: 20
          },
          {
            marginBottom: 0
          }
        )
      },
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        marginBottom: 5
      },
      style: { backgroundColor: Color.white },
      activeTintColor: Color.primary,
      pressColor: Color.cherryRed10,
      swipeEnabled: false,
      animationEnabled: true,
      keyboardHidesTabBar: true
    },
    lazy: true,
    initialRouteName: global.notificationData ? "Job" : "Dashboard",
    initialRouteParams: { transition: "fade" }
  }
);

const transitionFadeIn = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0.5, 1, 1]
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0.5, 1, 1]
  });

  return {
    opacity,
    transform: [{ scaleY }]
  };
  // const rotateY = position.interpolate({
  //   inputRange: [index - 1, index],
  //   outputRange: ['180deg', '0deg'],
  // });

  // return { transform: [{ rotateY }], backfaceVisibility: 'hidden' };
};

const transitionFromBottom = (index, layout, position) => {
  const { initHeight } = layout;

  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [initHeight, 0, 0]
  });

  const opacity = position.interpolate({
    inputRange: [index - 1, index - 0.99, index],
    outputRange: [0, 1, 1]
  });

  return { opacity, transform: [{ translateY }] };
  // const rotateY = position.interpolate({
  //   inputRange: [index - 1, index],
  //   outputRange: ["180deg", "0deg"]
  // });

  // return { transform: [{ rotateY }], backfaceVisibility: "hidden" };
};

const transitionFluid = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  });

  const scale = position.interpolate({
    inputRange: [0, 0.01, 0.99, 1],
    outputRange: [0.3, 0.3, 1, 1]
  });

  const translateX = position.interpolate({
    inputRange,
    outputRange: [Matrics.screenWidth - 20, 0, 0]
  });

  const translateY = position.interpolate({
    inputRange,
    outputRange: [Matrics.screenWidth - 40, 0, 0]
  });

  return {
    opacity,
    transform: [{ scale }, { translateX }, { translateY }]
  };
};

const transitionConfig = () => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const { index, route } = scene;

    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [width, 0, 0]
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1]
    });
    const params = route.params || {}; // <- That's new
    const transition = params.transition || "default"; // <- That's new
    return {
      transitionFromBottom: transitionFromBottom(index, layout, position),
      fadeInTransition: transitionFadeIn(index, position),
      fluidTransition: transitionFluid(index, position),
      default: { opacity, transform: [{ translateX }] }
    }[transition];
  }
});

const AppNavigation = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        // header: null
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        // header: null
      }
    },
    ForgotPassoword: {
      screen: ForgotPassowordScreen,
      navigationOptions: {
        // header: null
      }
    },
    TabHome: {
      screen: TabNavigation,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    ProfileInfo: {
      screen: profileInfoScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MetaInfo: {
      screen: MetaInfoScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EditProfile: {
      screen: editProfileScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ChangePassword: {
      screen: changePasswordScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    DeveloperOption: {
      screen: developerOptionScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    JobDetail: {
      screen: jobDetailScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Invite: {
      screen: InviteScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: "screen",
    transitionConfig
  }
);

export default createAppContainer(AppNavigation);
