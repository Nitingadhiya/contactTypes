import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  mainView: {
    borderWidth: 1,
    borderColor: Color.paleGreyThree,
    borderRadius: Matrics.ScaleValue(5),
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: Matrics.ScaleValue(10),
    paddingTop: Matrics.ScaleValue(20),
    paddingBottom: Matrics.ScaleValue(60)
  },
  titleDen: {
    fontSize: Matrics.ScaleValue(13),
    fontWeight: "bold"
  },
  subMainView: {
    width: Matrics.ScaleValue(80),
    height: Matrics.ScaleValue(80)
  },
  linkView: {
    width: Matrics.ScaleValue(70),
    height: Matrics.ScaleValue(70),
    borderWidth: 1,
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(35),
    justifyContent: "center",
    alignItems: "center"
  },
  linkText: {
    fontSize: Matrics.ScaleValue(10),
    marginTop: Matrics.ScaleValue(3),
    textAlign: "center"
  },
  copyLinkView: {
    borderWidth: 1,
    borderColor: Color.paleGrey,
    width: "85%",
    flexDirection: "row",
    height: Matrics.ScaleValue(40),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 1,
    bottom: -20,
    backgroundColor: Color.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 4
  },
  linkTextView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textLink: {
    fontSize: Matrics.ScaleValue(9),
    marginHorizontal: Matrics.ScaleValue(5)
  },
  touchView: {
    backgroundColor: Color.darkRed,
    height: Matrics.ScaleValue(40),
    paddingHorizontal: Matrics.ScaleValue(20),
    justifyContent: "center",
    alignItems: "flex-end"
  },
  copyTouchText: {
    fontSize: Matrics.ScaleValue(12),
    color: Color.white
  },
  scrollViewStyles: {
    flex: 1,
    padding: Matrics.ScaleValue(10)
  },
  qrCodeView: {
    flex: 1,
    height: Matrics.ScaleValue(120),
    width: Matrics.ScaleValue(120),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.paleGreyTwo,
    marginTop: Matrics.ScaleValue(10),
    alignItems: "center",
    alignSelf: "center",
    marginTop: Matrics.ScaleValue(50)
  }
});
