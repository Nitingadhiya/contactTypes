import { ifIphoneX } from "react-native-iphone-x-helper";
import {
  Color,
  Matrics,
  Fonts,
  ApplicationStyles
} from "../../../../common/styles";

export default (Styles = {
  subText: {
    color: Color.black70,
    fontFamily: Fonts.type.Rubik,
    fontSize: Matrics.ScaleValue(12)
  },
  typeLabel: {
    marginLeft: Matrics.ScaleValue(20),
    fontFamily: Fonts.type.Rubik,
    fontSize: Matrics.ScaleValue(16)
  }
});
module.exports = Styles;
