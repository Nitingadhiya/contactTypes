import {
  Color,
  Matrics,
  Fonts,
  ApplicationStyles
} from "../../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  contentViewStyle: {
    backgroundColor: Color.white
  },
  textInput: {
    height: Matrics.ScaleValue(55),
    borderBottomWidth: 1,
    borderBottomColor: Color.paleGreyTwo,
    fontSize: Matrics.ScaleValue(18),
    padding: 0,
    lineHeight: Matrics.ScaleValue(24),
    fontFamily: Fonts.type.Rubik,
    marginBottom: 3,
    paddingRight: Matrics.ScaleValue(45)
  },
  signInButton: {
    marginTop: Matrics.ScaleValue(25),
    marginBottom: Matrics.ScaleValue(10)
  },
  placeholderStyle: {
    lineHeight: Matrics.ScaleValue(24),
    fontFamily: Fonts.type.Rubik
  }
});
module.exports = Styles;
