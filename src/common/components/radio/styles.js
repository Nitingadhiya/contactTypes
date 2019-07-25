import {
  Color,
  Images,
  Matrics,
  Fonts,
  ApplicationStyles
} from "../../../common/styles";
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
    fontFamily: Fonts.type.Rubik,
    marginRight: Matrics.ScaleValue(18)
  },
  q2OptionView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Matrics.ScaleValue(3)
  },
  checkedRoundBRD: {
    borderWidth: 1,
    height: Matrics.ScaleValue(22),
    width: Matrics.ScaleValue(22),
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(11),
    justifyContent: "center",
    alignItems: "center"
  },
  dotStyles: {
    backgroundColor: Color.darkRed,
    height: Matrics.ScaleValue(12),
    width: Matrics.ScaleValue(12),
    borderRadius: Matrics.ScaleValue(6)
  }
});
module.exports = Styles;
