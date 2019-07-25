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
  brdBtmheader: {
    height: Matrics.ScaleValue(1),
    width: "100%",
    backgroundColor: Color.paleGrey
  },
  userImageView: {
    marginVertical: Matrics.ScaleValue(28),
    height: Matrics.ScaleValue(96),
    width: Matrics.ScaleValue(96),
    borderWidth: 1,
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(48)
  },
  profilePhotoCss: {
    height: Matrics.ScaleValue(96),
    width: Matrics.ScaleValue(96),
    borderRadius: Matrics.ScaleValue(48),
    borderWidth: 1,
    borderColor: Color.paleGrey
  },
  editPhotoTouch: {
    position: "absolute",
    zIndex: 1,
    right: -10,
    padding: Matrics.ScaleValue(3),
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(100)
  },
  keyboardScroll: {
    flex: 1,
    backgroundColor: Color.white
  },
  flagStyles: {
    width: Matrics.ScaleValue(18),
    height: Matrics.ScaleValue(15),
    marginRight: Matrics.ScaleValue(5),
    borderWidth: 1,
    borderColor: Color.paleGreyTwo
  }
});
