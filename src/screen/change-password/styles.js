import { ifIphoneX } from "react-native-iphone-x-helper";
import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  modalViewContainer: {
    flex: 1,
    backgroundColor: Color.white,
    ...ifIphoneX(
      {
        marginBottom: 30
      },
      {
        marginBottom: 0
      }
    )
  },
  viewContainer: {
    padding: Matrics.ScaleValue(15),
    flex: 1
  },
  textViewStyle: {
    flex: 1
  },
  modalBody: {
    height: "100%"
  },
  keyboardScroll: {
    flex: 1,
    backgroundColor: Color.white
  }
});
