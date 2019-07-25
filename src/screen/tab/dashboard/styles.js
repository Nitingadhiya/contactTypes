import {
  Color,
  Matrics,
  Fonts,
  ApplicationStyles
} from "../../../common/styles";

export default (Styles = {
  ...ApplicationStyles,
  scrollViewStyles: {
    flex: 1
  },
  customCamp: {
    marginTop: Matrics.ScaleValue(15),
    marginHorizontal: Matrics.ScaleValue(15)
  },
  addFloatingView: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: Color.lightishRed,
    height: Matrics.ScaleValue(55),
    width: Matrics.ScaleValue(55),
    borderRadius: Matrics.ScaleValue(55) / 2,
    bottom: Matrics.ScaleValue(28),
    right: Matrics.ScaleValue(28),
    justifyContent: "center",
    alignItems: "center"
  },
  addText: {
    fontSize: Matrics.ScaleValue(24),
    color: Color.white,
    fontFamily: Fonts.type.Rubik
  },
  userNameText: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(20),
    fontFamily: Fonts.type.RubikMedium
  },
  sectionTwoTitle: {
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.RubikMedium,
    color: Color.black30
  },
  sectionType: {
    marginVertical: Matrics.ScaleValue(10),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  sectionViewTouch: {
    width: Matrics.screenWidth / 7,
    height: Matrics.screenWidth / 7,
    marginTop: Matrics.ScaleValue(10),
    alignItems: "center",
    marginHorizontal: Matrics.screenWidth * 0.014,
    borderColor: Color.paleGrey,
    borderRadius: Matrics.screenWidth / 14,
    justifyContent: "center",
    backgroundColor: Color.paleGrey
  },
  sectionSepView: {
    backgroundColor: Color.white,
    marginVertical: Matrics.ScaleValue(5),
    padding: Matrics.ScaleValue(10)
  },
  userNameView: {
    marginLeft: Matrics.ScaleValue(5),
    flexWrap: "wrap",
    flex: 1
  },
  subContainer: {
    flexDirection: "row",
    padding: Matrics.ScaleValue(10),
    backgroundColor: Color.white
  },
  imagePhotoView: {
    height: Matrics.ScaleValue(60),
    width: Matrics.ScaleValue(60),
    borderWidth: 1,
    borderColor: Color.paleGrey,
    borderRadius: Matrics.ScaleValue(30)
  },
  starView: {
    flexDirection: "row",
    marginRight: Matrics.ScaleValue(5)
  },
  colorMainView: {
    backgroundColor: Color.parrot,
    borderRadius: Matrics.ScaleValue(5),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Matrics.ScaleValue(1),
    paddingHorizontal: Matrics.ScaleValue(4),
    marginLeft: Matrics.ScaleValue(3)
  },
  textTodayDate: {
    color: Color.white,
    fontSize: Matrics.ScaleValue(8),
    marginLeft: Matrics.ScaleValue(3)
  },
  viewStarMain: {
    flexDirection: "row"
  },
  starNameText: {
    fontSize: Matrics.ScaleValue(11),
    fontWeight: "bold"
  },
  descriptionText: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(12)
  },
  sectionThreeTitle: {
    flexDirection: "row"
  },
  titleQuestionText: {
    marginLeft: Matrics.ScaleValue(3),
    color: Color.black30,
    fontFamily: Fonts.type.RubikMedium,
    fontSize: Matrics.ScaleValue(16)
  },
  phoneNumberText: {
    color: Color.darkRed,
    fontSize: Matrics.ScaleValue(14),
    padding: Matrics.ScaleValue(5)
  },
  viewEmail: {
    paddingBottom: Matrics.ScaleValue(15)
  },
  justCallText: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(15)
  },
  callusView: {
    flexDirection: "row",
    marginVertical: Matrics.ScaleValue(10),
    alignItems: "center"
  },
  thirdSectionView: {
    backgroundColor: Color.white,
    padding: Matrics.ScaleValue(10)
  },
  emailView: {
    flexDirection: "row",
    //marginBottom: Matrics.ScaleValue(10),
    alignItems: "center"
  },
  reviewSections: {
    backgroundColor: Color.white,
    marginBottom: Matrics.ScaleValue(5),
    padding: Matrics.ScaleValue(10)
  },
  writeReviewLink: {
    fontSize: Matrics.ScaleValue(12),
    marginTop: Matrics.ScaleValue(10),
    color: Color.darkRed,
    fontFamily: Fonts.type.Rubik,
    textDecorationLine: "underline"
  },
  reviewPersonName: {
    fontFamily: Fonts.type.RubikBold
  },
  heading: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.RubikBold
  },
  ratingStarView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  },
  reviewCategotyTiteText: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(12),
    marginRight: Matrics.ScaleValue(12),
    width: "40%",
    fontFamily: Fonts.type.RubikBold
  },
  reviewCategoryView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Matrics.ScaleValue(5)
  },
  categoryMainView: {
    marginVertical: Matrics.ScaleValue(15),
    borderWidth: 1
  },
  earnIconStyle: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    right: 0,
    backgroundColor: Color.parrot,
    padding: Matrics.ScaleValue(5),
    borderRadius: Matrics.ScaleValue(8.5)
  },
  earnedSections: {
    backgroundColor: Color.darkRed90
  }
});
module.exports = Styles;
