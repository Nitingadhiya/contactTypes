import { StyleSheet } from "react-native";
import { Color, Matrics, Fonts } from "../../../../../src/common/styles";
export const SelectBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: Matrics.ScaleValue(50),
    //paddingVertical: 10,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgb(236,239,241)",
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  chooseText: {
    //fontWeight: "500",
    color: Color.black70, //"rgba(0,0,0,0.5)",
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.Rubik
  },
  downBtn: {
    width: 10,
    height: 10
  },
  pressBtn: {
    marginVertical: 10
  },
  disabledBtn: {
    borderColor: "#ddd"
  },
  disabledTxt: {
    color: "#ddd"
  },
  disabledImage: {
    opacity: 0.2
  }
});
//# sourceMappingURL=SelectBoxStyle.js.map
