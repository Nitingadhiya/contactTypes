import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";

export default (Styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  loginBtn: {
    width: Matrics.screenWidth / 2,
    borderRightWidth: 1,
    borderColor: Color.white
  },
  registerBtn: {
    width: Matrics.screenWidth / 2
  },
  seprator: {
    marginTop: Matrics.ScaleValue(10)
  },
  ScreenLogoView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoStyles: {
    width: Matrics.ScaleValue(300),
    height: Matrics.ScaleValue(30)
  },
  animatedTruckStyle: {
    width: Matrics.ScaleValue(80),
    height: Matrics.ScaleValue(30)
  },
  buttonView: {
    flexDirection: "row",
    width: "100%"
  }
});
module.exports = Styles;
