import { Color, Matrics, Fonts, ApplicationStyles } from "../../common/styles";
export default (Styles = {
  ...ApplicationStyles,
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "white"
  },
  textViewStyle: {
    flex: 1,
    marginHorizontal: Matrics.ScaleValue(15),
    marginTop: Matrics.ScaleValue(30)
  }
});
