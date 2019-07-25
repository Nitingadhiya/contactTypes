import {
  ApplicationStyles,
  Matrics,
  Fonts,
  Color
} from "../../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  manageScroll: {
    flex: 1,
    backgroundColor: Color.paleGrey
  },
  contentView: {
    flex: 1,
    padding: Matrics.ScaleValue(15),
    backgroundColor: Color.paleGrey
  },
  logoutTouch: {
    height: Matrics.ScaleValue(55),
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(4),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Matrics.ScaleValue(5)
  },
  logoutView: {
    flex: 1,
    justifyContent: "flex-end"
  },
  logoutText: {
    fontFamily: Fonts.type.RubikMedium,
    fontSize: Matrics.ScaleValue(14),
    lineHeight: Matrics.ScaleValue(20),
    color: Color.darkRed90
  }
});
module.exports = Styles;
