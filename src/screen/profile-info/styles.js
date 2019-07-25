import { ApplicationStyles, Matrics, Fonts, Color } from "../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    backgroundColor: Color.paleGrey
  },
  editTouch: {
    padding: Matrics.ScaleValue(15)
  },
  editText: {
    color: Color.darkRed90,
    fontSize: Matrics.ScaleValue(13),
    fontFamily: Fonts.type.Rubik
  },
  contentView: {
    // flex: 1,
    margin: Matrics.ScaleValue(15),
    marginTop: Matrics.ScaleValue(72),
    backgroundColor: Color.white,
    alignItems: "center"
  },
  profileContentView: {
    flex: 1,
    paddingHorizontal: Matrics.ScaleValue(15),
    paddingVertical: Matrics.ScaleValue(5),
    backgroundColor: Color.paleGrey,
    marginTop: Matrics.ScaleValue(10)
  },
  userImageView: {
    borderRadius: Matrics.ScaleValue(84) / 2,
    padding: Matrics.ScaleValue(7),
    marginTop: -Matrics.ScaleValue(42),
    backgroundColor: Color.white,
    alignItems: "center",
    overflow: "hidden"
  },
  userImage: {
    width: Matrics.ScaleValue(70),
    height: Matrics.ScaleValue(70),
    borderRadius: Matrics.ScaleValue(35)
  },
  userDetails: {
    paddingVertical: Matrics.ScaleValue(23),
    width: "100%"
  },
  borderBtm: {
    height: Matrics.ScaleValue(1),
    width: "90%",
    backgroundColor: Color.paleGrey
  },
  viewCombine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  usernameText: {
    color: Color.darkThree,
    fontSize: Matrics.ScaleValue(20),
    lineHeight: Matrics.ScaleValue(20),
    textAlign: "center",
    fontFamily: Fonts.type.Rubik
  },
  usernameEmail: {
    color: Color.cloudyBlue,
    fontSize: Matrics.ScaleValue(12),
    //lineHeight: Matrics.ScaleValue(18),
    textAlign: "center",
    fontFamily: Fonts.type.Rubik,
    marginVertical: Matrics.ScaleValue(4)
  },
  usernameMobileNo: {
    color: Color.cloudyBlue,
    fontSize: Matrics.ScaleValue(12),
    //lineHeight: Matrics.ScaleValue(18),
    textAlign: "center",
    fontFamily: Fonts.type.Rubik,
    marginVertical: Matrics.ScaleValue(4)
  },
  userDescView: {
    marginVertical: Matrics.ScaleValue(18),
    paddingHorizontal: Matrics.ScaleValue(15)
  },
  userDescText: {
    color: Color.darkBlack,
    fontSize: Matrics.ScaleValue(13),
    lineHeight: Matrics.ScaleValue(20),
    textAlign: "left",
    fontFamily: Fonts.type.Rubik
  },
  language: {
    color: Color.cloudyBlue,
    fontSize: Matrics.ScaleValue(10),
    // lineHeight: Matrics.ScaleValue(18),
    textAlign: "center",
    fontFamily: Fonts.type.Rubik
  },
  logoutTouch: {
    height: Matrics.ScaleValue(55),
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(4),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Matrics.ScaleValue(5)
  },
  logoutView: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: Matrics.ScaleValue(15)
  },
  logoutText: {
    fontFamily: Fonts.type.RubikMedium,
    fontSize: Matrics.ScaleValue(14),
    lineHeight: Matrics.ScaleValue(20),
    color: Color.darkRed90
  },
  confirmText: {
    color: Color.darkRed,
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.RubikBold,
    textDecorationLine: "underline"
  },
  emailView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  touchButton: {
    justifyContent: "center",
    paddingHorizontal: Matrics.ScaleValue(10),
    paddingVertical: Matrics.ScaleValue(10)
  }
});
module.exports = Styles;
