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
  flatlistView: {
    flex: 1,
    backgroundColor: Color.white
  },
  flatLsitStyles: {
    flex: 1
  },
  containerStyles: {
    flexGrow: 1
    //padding: Matrics.ScaleValue(10)
  }
});
module.exports = Styles;
