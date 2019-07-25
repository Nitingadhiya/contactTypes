import { Color, Matrics, Fonts } from "../../../common/styles";

export default (Styles = {
  mainFront: {
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(10),
    flex: 1
  },
  addressLabel: {
    fontSize: Matrics.ScaleValue(18),
    fontFamily: Fonts.type.Rubik,
    color: Color.black30,
    marginBottom: Matrics.ScaleValue(10)
  },
  smallTextLabel: {
    color: Color.darkGray,
    fontSize: Matrics.ScaleValue(16),
    lineHeight: Matrics.ScaleValue(20),
    fontFamily: Fonts.type.Rubik
  },
  smallEGTextLabel: {
    color: Color.lightGray,
    fontSize: Matrics.ScaleValue(11),
    lineHeight: Matrics.ScaleValue(20),
    fontFamily: Fonts.type.Rubik
  },
  currentLocationView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: Matrics.ScaleValue(10),
    paddingRight: Matrics.ScaleValue(10),
    alignSelf: "flex-start"
  },
  currentLocationText: {
    color: Color.darkRed90,
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Rubik
  },
  placeInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Matrics.ScaleValue(5)
  },
  gAddressText: {
    color: Color.black70,
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.Rubik,
    flex: 1
  },
  useTouch: {
    justifyContent: "flex-end",
    backgroundColor: Color.darkRed,
    padding: Matrics.ScaleValue(5),
    borderRadius: Matrics.ScaleValue(5)
  },
  useTouchText: {
    color: Color.white,
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.Rubik
  }
});
module.exports = Styles;
