import { ifIphoneX } from "react-native-iphone-x-helper";
import {
  Color,
  Matrics,
  Fonts,
  ApplicationStyles
} from "../../../common/styles";

export default (Styles = {
  backBtnStyle: {
    borderWidth: 1,
    borderColor: Color.darkRed,
    backgroundColor: Color.white
  },
  backBtnTextStyle: {
    color: Color.darkRed
  },
  stepBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 1,
    ...ifIphoneX(
      {
        bottom: 20
      },
      {
        bottom: 0
      }
    ),
    right: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: "100%"
  }
});
module.exports = Styles;
