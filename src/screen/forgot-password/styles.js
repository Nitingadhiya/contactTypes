import { ifIphoneX } from "react-native-iphone-x-helper";
import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  modalViewContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  viewContainer: {
    paddingTop: Matrics.ScaleValue(30),
    backgroundColor: Color.white,
    flex: 1
  },
  textViewStyle: {
    flex: 1
  },
  modalBody: {
    flex: 1,
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(15)
  },
  textInput: {
    height: Matrics.ScaleValue(55),
    borderBottomWidth: 1,
    borderBottomColor: Color.paleGreyTwo,
    fontSize: Matrics.ScaleValue(18),
    padding: 0,
    lineHeight: Matrics.ScaleValue(24),
    fontFamily: Fonts.type.Rubik,
    marginBottom: 3,
    paddingRight: Matrics.ScaleValue(45)
  },
  keyboardScroll: {
    flex: 1,
    backgroundColor: Color.paleGrey
  },
  registeredEmailText: {
    fontSize: Matrics.ScaleValue(18),
    color: Color.black70,
    textAlign: "center"
  },
  regEmailView: {
    padding: Matrics.ScaleValue(10)
  }
});
