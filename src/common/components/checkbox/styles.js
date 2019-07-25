import { Color, Images, Matrics, Fonts, ApplicationStyles } from "../../styles";
export default (Styles = {
  ...ApplicationStyles,
  q2Title: {
    fontSize: Matrics.ScaleValue(18),
    color: Color.black30,
    fontFamily: Fonts.type.Rubik,
    marginBottom: Matrics.ScaleValue(5)
  },
  q2subTitle: {
    fontSize: Matrics.ScaleValue(14),
    color: Color.black30,
    marginBottom: Matrics.ScaleValue(5),
    fontFamily: Fonts.type.Rubik
  },
  q2TitleOption: {
    fontSize: Matrics.ScaleValue(16),
    color: Color.black70,
    marginLeft: Matrics.ScaleValue(5),
    flexWrap: "wrap",
    fontFamily: Fonts.type.Rubik,
    marginRight: Matrics.ScaleValue(18)
  },
  q2OptionView: {
    alignSelf: "flex-start",
    marginVertical: Matrics.ScaleValue(6)
  },
  touchBtn: {
    flexDirection: "row"
  },
  checkView: {
    borderWidth: 1,
    borderRadius: Matrics.ScaleValue(4),
    borderColor: Color.paleGreyTwo,
    height: Matrics.ScaleValue(20),
    width: Matrics.ScaleValue(20),
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxView: {
    alignSelf: "flex-start",
    width: Matrics.screenWidth - Matrics.ScaleValue(20)
  },
  privacyText: {
    color: Color.darkRed
  }
});
module.exports = Styles;
