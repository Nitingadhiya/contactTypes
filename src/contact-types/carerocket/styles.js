import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Color.black
  },
  starDriver: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(20),
    fontWeight: "bold"
  },
  mainView: {
    margin: Matrics.ScaleValue(10),
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
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: "100%"
  },
  stepDisplay: {
    borderBottomWidth: 0,
    height: 1,
    borderColor: Color.paleGrey
    //marginVertical: Matrics.ScaleValue(10)
  },
  viewInformation: {
    // position: "absolute",
    // marginTop: Matrics.ScaleValue(70)
  },
  q2Title: {
    fontSize: Matrics.ScaleValue(18),
    color: Color.black30,
    fontFamily: Fonts.type.Rubik,
    marginBottom: Matrics.ScaleValue(5)
  },
  q2TitleOption: {
    fontSize: Matrics.ScaleValue(14),
    color: Color.black30,
    fontWeight: "bold",
    marginLeft: Matrics.ScaleValue(5)
  },
  q2OptionView: {
    flexDirection: "row",
    alignItems: "center"
  },
  customRadioBtnStyles: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  radioButtonView: {
    // marginRight: Matrics.ScaleValue(15)
  },
  checkboxTitleStyle: {
    fontWeight: "normal",
    fontSize: Matrics.ScaleValue(13),
    color: Color.black70
  },
  checkboxView: {
    alignItems: "flex-start",
    marginRight: Matrics.ScaleValue(20)
  },
  chooseTypeReg: {
    borderWidth: 1,
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(5),
    flexDirection: "row",
    height: Matrics.ScaleValue(60),
    alignItems: "center",
    paddingHorizontal: Matrics.ScaleValue(20),
    marginTop: Matrics.ScaleValue(5)
  },
  textInput: {
    height: Matrics.ScaleValue(45),
    borderBottomWidth: 1,
    borderColor: Color.paleGreyTwo,
    fontSize: Matrics.ScaleValue(16),
    padding: 0,
    lineHeight: Matrics.ScaleValue(24),
    fontFamily: Fonts.type.Rubik,
    marginBottom: 3,
    paddingRight: Matrics.ScaleValue(45),
    padding: Matrics.ScaleValue(5),
    borderRadius: Matrics.ScaleValue(5)
  },
  progressView: {
    width: "100%",
    height: Matrics.ScaleValue(15),
    backgroundColor: Color.paleGreyThree,
    borderRadius: 5
  },
  fillProgressView: {
    backgroundColor: Color.darkRed
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
