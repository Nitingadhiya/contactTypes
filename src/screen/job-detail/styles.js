import { Matrics, ApplicationStyles, Color, Fonts } from "../../common/styles";
export default (Styles = {
  ...ApplicationStyles,
  mainContainer: {
    backgroundColor: Color.white,
    flex: 1
  },
  bgImage: {
    width: Matrics.screenWidth,
    height: Matrics.screenWidth / 2
    //marginLeft: -Matrics.ScaleValue(10),
  },
  jobBgView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: Matrics.ScaleValue(10)
  },
  detailView: {
    //padding: Matrics.ScaleValue(10)
  },
  jobTitle: {
    fontSize: Matrics.ScaleValue(18),
    fontFamily: Fonts.type.RubikBold,
    color: Color.white
  },
  logisticTitle: {
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.RubikBold,
    color: Color.black30
  },
  companyStarView: {
    flexDirection: "row",
    marginRight: Matrics.ScaleValue(5),
    alignItems: "center"
  },
  mapView: {
    borderWidth: 1,
    overflow: "hidden",
    borderColor: Color.paleGreyTwo,
    minHeight: Matrics.screenWidth / 2,
    borderRadius: Matrics.ScaleValue(5),
    marginTop: Matrics.ScaleValue(10)
  },
  estimateHText: {
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.Rubik,
    color: Color.black30,
    textAlign: "center"
  },
  estimateHoursView: {
    padding: Matrics.ScaleValue(10),
    justifyContent: "center",
    alignItems: "center"
  },
  distanceKmText: {
    fontFamily: Fonts.type.RubikBold
  },
  driverGetToKnow: {
    marginTop: Matrics.ScaleValue(10),
    borderWidth: 1,
    overflow: "hidden",
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(5)
  },
  queryStyles: {
    paddingVertical: Matrics.ScaleValue(10),
    marginHorizontal: Matrics.ScaleValue(10),
    borderBottomWidth: 1,
    borderBottomColor: Color.paleGrey
  },
  queText: {
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.RubikBold
  },
  queSubText: {
    fontSize: Matrics.ScaleValue(12),
    fontFamily: Fonts.type.Rubik,
    color: Color.black70
  },
  iconView: {
    width: Matrics.screenWidth / 3.5,
    marginVertical: Matrics.ScaleValue(10),
    alignItems: "center",
    justifyContent: "center"
  },
  empBenefits: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  iconText: {
    fontSize: Matrics.ScaleValue(10),
    color: Color.black70,
    textAlign: "center"
  },
  txtBenView: {
    margin: Matrics.ScaleValue(10),
    paddingTop: Matrics.ScaleValue(5),
    borderTopWidth: 1,
    borderColor: Color.paleGrey
  },
  textBen: {
    color: Color.black70,
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.Rubik,
    marginLeft: Matrics.ScaleValue(5),
    lineHeight: Matrics.ScaleValue(20),
    flex: 1
  },
  combineView: {
    flexDirection: "row"
  },
  empBText: {
    margin: Matrics.ScaleValue(10),
    fontSize: Matrics.ScaleValue(16),
    fontFamily: Fonts.type.RubikBold
  },
  advisorInfoView: {
    flexDirection: "row"
  },
  advisorDtl: {
    //flexDirection: "row"
    flex: 1,
    padding: Matrics.ScaleValue(10)
  },
  advName: {
    fontFamily: Fonts.type.RubikBold,
    fontSize: Matrics.ScaleValue(14)
  },
  advType: {
    fontSize: Matrics.ScaleValue(12),
    color: Color.black70,
    fontFamily: Fonts.type.Rubik
  },
  advisorImage: {
    justifyContent: "flex-start",
    height: Matrics.ScaleValue(60),
    width: Matrics.ScaleValue(60),
    borderWidth: 1,
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(30),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  contactView: {
    // marginBottom: Matrics.ScaleValue(20),
    //paddingBottom: Matrics.ScaleValue(10)
  },
  acceptBtn: {
    width: "50%",
    borderRightWidth: 1,
    borderColor: Color.white
  },
  rejectBtn: { width: "50%" },
  viewDirection: { flexDirection: "row" },
  alreadyUnlockText: {
    textAlign: "center",
    fontSize: Matrics.ScaleValue(14),
    color: Color.darkRed,
    fontFamily: Fonts.type.Rubik
  },
  unlockedView: {
    backgroundColor: Color.white,
    alignItems: "center",
    padding: Matrics.ScaleValue(10),
    borderTopWidth: 1,
    borderTopColor: Color.paleGreyTwo
  },
  titleExp: {
    fontSize: Matrics.ScaleValue(18),
    color: Color.black30,
    fontFamily: Fonts.type.Rubik
  },
  expWantedSubTitleText: {
    fontSize: Matrics.ScaleValue(14),
    color: Color.black70,
    fontFamily: Fonts.type.Rubik,
    marginLeft: Matrics.ScaleValue(5)
  },
  viewIconTitle: {
    flexDirection: "row",
    marginTop: Matrics.ScaleValue(5)
  },
  viewWantedSpace: {
    marginTop: Matrics.ScaleValue(10)
  },
  listViewSalary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Matrics.ScaleValue(5)
  },
  labelText: {
    fontSize: Matrics.ScaleValue(14),
    color: Color.black30,
    fontFamily: Fonts.type.Rubik
  },
  valueText: {
    fontSize: Matrics.ScaleValue(14),
    color: Color.black70,
    fontFamily: Fonts.type.Rubik
  },
  mainViewSalary: {
    paddingHorizontal: Matrics.ScaleValue(10)
  },
  salaryText: {
    fontSize: Matrics.ScaleValue(14),
    color: Color.black30,
    fontFamily: Fonts.type.RubikBold
  },
  typeSalary: {
    color: Color.silver,
    fontSize: Matrics.ScaleValue(10)
  },
  bgView: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    padding: Matrics.ScaleValue(5),
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  compReviewText: {
    fontSize: Matrics.ScaleValue(9),
    color: Color.lightGray,
    fontFamily: Fonts.type.Rubik
  },
  hrTag: {
    borderWidth: 0.5,
    borderColor: Color.paleGreyTwo,
    marginVertical: Matrics.ScaleValue(10)
  },
  companyBadgeText: {
    color: Color.darkGray,
    fontFamily: Fonts.type.Rubik,
    fontSize: Matrics.ScaleValue(11)
  },
  drawLine: {
    borderWidth: 1.5,
    width: Matrics.ScaleValue(18),
    alignSelf: "center",
    marginTop: Matrics.ScaleValue(5),
    marginBottom: Matrics.ScaleValue(10)
  },
  countTextStyles: {
    color: Color.black,
    fontFamily: Fonts.type.RubikBold,
    fontSize: Matrics.ScaleValue(12),
    marginBottom: Matrics.ScaleValue(10)
  },
  viewResp: {
    width: (Matrics.screenWidth - Matrics.ScaleValue(50)) / 3,
    alignItems: "center"
  },
  titleContactPerson: {
    color: Color.lightGray,
    fontFamily: Fonts.type.Rubik,
    fontSize: Matrics.ScaleValue(12)
  },
  attentionNotes: {
    color: Color.lightGray,
    fontFamily: Fonts.type.Rubik,
    fontSize: Matrics.ScaleValue(12),
    margin: Matrics.ScaleValue(10),
    fontStyle: "italic"
  },
  textAttension: {
    color: Color.black,
    fontFamily: Fonts.type.RubikBold
  },
  tabMainView: {
    flexDirection: "row",
    marginVertical: Matrics.ScaleValue(15),
    borderWidth: 1,
    borderColor: Color.darkRed,
    borderRadius: Matrics.ScaleValue(5),
    overflow: "hidden"
  },
  tabView: {
    height: Matrics.ScaleValue(40),
    width: (Matrics.screenWidth - Matrics.ScaleValue(40)) / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  activeTab: {
    backgroundColor: Color.darkRed
  },
  activeTabText: {
    color: Color.white
  },
  tabText: {
    color: Color.black30,
    fontFamily: Fonts.type.Rubik,
    fontSize: Matrics.ScaleValue(14)
  },
  thirdViewStyles: {
    borderWidth: 0,
    width: Matrics.screenWidth - Matrics.ScaleValue(20),
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(5),
    padding: Matrics.ScaleValue(10),
    margin: Matrics.ScaleValue(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 4
  },
  cardViewCompany: {
    borderWidth: 0,
    width: Matrics.screenWidth - Matrics.ScaleValue(20),
    marginTop: Matrics.ScaleValue(-50),
    backgroundColor: Color.white,
    borderRadius: Matrics.ScaleValue(5),
    padding: Matrics.ScaleValue(10),
    margin: Matrics.ScaleValue(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 4
  },
  innerViewCard: {
    flexDirection: "row",
    zIndex: 1
  },
  reviewRatingView: {
    flex: 1
  },
  ratingStarView: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "flex-end",
    width: Matrics.ScaleValue(100)
  },
  reviewCategotyTiteText: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(16),
    marginRight: Matrics.ScaleValue(12),
    flex: 1,
    fontFamily: Fonts.type.Rubik
  },
  reviewCategoryView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Matrics.ScaleValue(5)
  },
  categoryMainView: {
    marginBottom: Matrics.ScaleValue(10)
  },
  starView: {
    marginHorizontal: Matrics.ScaleValue(2)
  },
  innerView: {
    padding: Matrics.ScaleValue(5)
  },
  userName: {
    color: Color.black30,
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.RubikBold,
    flex: 1
  },
  dateText: {
    color: Color.lightGray,
    fontSize: Matrics.ScaleValue(10),
    fontFamily: Fonts.type.Rubik
  },
  reviewText: {
    color: Color.darkGray,
    fontSize: Matrics.ScaleValue(14),
    fontFamily: Fonts.type.Rubik
  },
  starRatingCount: {
    textAlign: "center",
    width: Matrics.ScaleValue(100),
    fontFamily: Fonts.type.RubikBold,
    fontSize: Matrics.ScaleValue(14)
  },
  mainRatingView: { marginVertical: Matrics.ScaleValue(15) },
  fullReview: {
    borderWidth: 1,
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(5),
    padding: Matrics.ScaleValue(10),
    marginBottom: Matrics.ScaleValue(10)
  },
  staticView: {
    borderWidth: 1,
    overflow: "hidden",
    borderColor: Color.paleGreyTwo,
    borderRadius: Matrics.ScaleValue(5),
    marginVertical: Matrics.ScaleValue(10),
    padding: Matrics.ScaleValue(10)
  },
  textReviewStatic: {
    fontSize: Matrics.ScaleValue(12),
    color: Color.black70
  }
});
module.exports = Styles;
