import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  stepBGView: {
    backgroundColor: Color.darkRed,
    padding: 5,
    borderRadius: 5
  },
  flagStyles: {
    width: Matrics.ScaleValue(18),
    height: Matrics.ScaleValue(15),
    marginRight: Matrics.ScaleValue(5),
    borderWidth: 1,
    borderColor: Color.paleGreyTwo
  },
  extraFlagStyles: {
    width: Matrics.ScaleValue(30),
    height: Matrics.ScaleValue(22),
    borderWidth: 1,
    borderColor: Color.paleGreyTwo
  }
});
module.exports = Styles;
