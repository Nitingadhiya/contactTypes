import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Platform,
  WebView,
  ImageBackground
} from "react-native";
import Icon from "react-native-fontawesome-pro";
import StarRating from "react-native-star-rating";
import { Header, Checkbox, BottomBG } from "../../common/components";
import { Matrics, Color, Images, Fonts } from "../../common/styles";
import BottomButton from "../../common/components/bottom-button";
import Styles from "./styles";
import { Marker, Callout } from "react-native-maps";
import moment from "moment";
import ClusteredMapView from "react-native-maps-super-cluster";
import { APICaller, Events, Helper } from "../../util";
import Http from "../../api/http";
import GlobalVar from "../../global";
import RejectModal from "../../common/components/reject-modal";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class JobDetail extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(
      navigation,
      Helper.translation("Words.Job Detail", "Job Detail"),
      "",
      "back"
    );

  state = {
    activeMap: false,
    campaign_title: "",
    company: null,
    location: null,
    campaign_description: null,
    campaign_description_title: null,
    activity_description: null,
    qualifications: [],
    experiences: [],
    qualifications_wanted: [],
    experiences_wanted: [],
    benefits_icons: [],
    benefits: [],
    contact_person: [],
    contact_person_position: [],
    detailsData: "",
    message: null,
    rejectStateModal: false,
    activeTab: "1"
  };

  componentDidMount() {
    Helper.trackScreenView("JobDetailScreen");
    const { id } = this.props.navigation.state.params;
    this.offerId = id;
    this.getDetails(id);
    setTimeout(() => {
      this.setState({
        activeMap: true
      });
    }, 300);
    Events.on("rejectModal", "reject", res => {
      this.state.detailsData.offer_text = res.message || "";
      this.setState({
        rejectStateModal: res.modal
      });
      Events.trigger("refreshOfferScreen", "offerr");
    });
  }
  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId;

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    const clusteringEngine = this.map.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
        </View>
        {/*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>

            IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
           */}
      </Marker>
    );
  };

  renderMarker = data => {
    return <Marker key={data.id || Math.random()} coordinate={data.location} />;
  };

  jobTitleView = detailsData => {
    const { badge_user, company_badge_stat } = detailsData;
    const { name, position, logo } = badge_user;
    return (
      <View>
        <ImageBackground
          source={
            detailsData.campaign_image
              ? { uri: detailsData.campaign_image }
              : Images.roadheroesBG
          }
          style={Styles.bgImage}
        >
          <View style={Styles.jobBgView}>
            <Text style={Styles.jobTitle}>{detailsData.campaign_title}</Text>
          </View>
        </ImageBackground>
        <View style={Styles.cardViewCompany}>
          <View style={Styles.innerViewCard}>
            <View style={{ flex: 1 }}>
              <Text style={Styles.logisticTitle}>
                {detailsData.company && detailsData.badge_company.name}
              </Text>
              <View style={Styles.companyStarView}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={Matrics.ScaleValue(15)}
                  rating={3}
                  fullStarColor={Color.darkRed}
                  starStyle={Styles.companyStarView}
                  emptyStarColor={Color.paleGreyTwo}
                  iconSet={"FontAwesome"}
                  emptyStar={"star"}
                />
                <Text style={Styles.compReviewText}>
                  {detailsData.reviews.length}{" "}
                  {Helper.translation("Words.reviews", "reviews")}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                right: 0
              }}
            >
              {detailsData.badge_company && detailsData.badge_company.logo ? (
                <ImageBackground
                  source={{ uri: detailsData.badge_company.logo }}
                  style={{
                    width: Matrics.ScaleValue(100),
                    height: Matrics.ScaleValue(40)
                  }}
                  resizeMode="center"
                />
              ) : null}
            </View>
          </View>
          <View style={Styles.hrTag} />
          {/*  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            {company_badge_stat &&
              company_badge_stat.map(res => (
                <View style={Styles.viewResp} key={`${res.name}`}>
                  <Text style={Styles.companyBadgeText}>{res.name}</Text>
                  <View style={[Styles.drawLine, { borderColor: res.color }]} />
                  <Text style={Styles.countTextStyles}>{res.stat}</Text>
                  <Icon
                    name={Helper.splitIconName(res.icon_class)}
                    size={Matrics.ScaleValue(15)}
                    type={"regular"}
                    color={res.color}
                  />
                </View>
              ))}
          </View>
          {/*  */}
          <View style={Styles.hrTag} />
          {badge_user && this.contactPerson(name, position, logo)}
        </View>
      </View>
    );
  };

  distanceRender = (activeMap, detailsData) => (
    <View style={Styles.mapView}>
      {activeMap && detailsData.location && (
        <ClusteredMapView
          width={Matrics.screenWidth - 22}
          height={(Matrics.screenWidth - 22) / 2}
          data={[
            {
              location: {
                latitude: detailsData.location.lat,
                longitude: detailsData.location.lng
              }
            }
          ]}
          initialRegion={{
            latitude: detailsData.location.lat,
            longitude: detailsData.location.lng,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012
          }}
          ref={r => {
            this.map = r;
          }}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
        />
      )}
      {detailsData.distance ? (
        <View style={Styles.estimateHoursView}>
          <Text style={Styles.estimateHText}>
            {Helper.translation(
              "Words.Estimated driving distance",
              "Estimated driving distance"
            )}
            :<Text style={Styles.distanceKmText}> {detailsData.distance} </Text>
            ({detailsData.time}){" "}
            {Helper.translation(
              "Words.from your location",
              "from your location"
            )}
          </Text>
        </View>
      ) : null}
    </View>
  );

  informationView = detailsData => {
    return (
      <View style={Styles.driverGetToKnow}>
        {detailsData.campaign_description && (
          <View style={Styles.queryStyles}>
            <Text style={Styles.queText}>
              {detailsData.campaign_description_title}
            </Text>
            <Text style={Styles.queSubText}>
              {detailsData.campaign_description}
            </Text>
          </View>
        )}
        {detailsData.activity_description && (
          <View style={Styles.queryStyles}>
            <Text style={Styles.queText}>
              {detailsData.activity_description_title}
            </Text>
            <Text style={Styles.queSubText}>
              {detailsData.activity_description}
            </Text>
          </View>
        )}
        {detailsData.truck && (
          <View style={Styles.queryStyles}>
            <Text style={Styles.queText}>{detailsData.truck_title}</Text>
            <Text style={Styles.queSubText}>{detailsData.truck}</Text>
          </View>
        )}
        {detailsData.transported_goods && (
          <View style={Styles.queryStyles}>
            <Text style={Styles.queText}>
              {detailsData.transported_goods_title}
            </Text>
            <Text style={Styles.queSubText}>
              {detailsData.transported_goods}
            </Text>
          </View>
        )}
      </View>
    );
  };

  qualificationView = (
    qualifications,
    experiences,
    qualifications_wanted,
    experiences_wanted,
    qualifications_wanted_title,
    qualifications_wanted_sub_title,
    experiences_wanted_title,
    experiences_wanted_sub_title
  ) => (
    <View style={Styles.driverGetToKnow}>
      <View style={Styles.queryStyles}>
        {qualifications_wanted_title ? (
          <Text style={Styles.queText}>
            {Helper.translation(
              "Words.What we are looking for",
              "What we are looking for"
            )}
          </Text>
        ) : (
          <Text />
        )}
        <View style={{ marginTop: Matrics.ScaleValue(10) }}>
          {qualifications && qualifications.length > 0 && (
            <Checkbox
              items={qualifications}
              title={Helper.translation(
                "Register.Qualifications",
                "Qualifications"
              )}
              stateName="qualifications"
              langType="Register"
              disabled={true}
              screen={"jobDetails"}
            />
          )}
          {experiences && experiences.length > 0 && (
            <Checkbox
              items={experiences}
              title={Helper.translation("Register.Experiences", "Experiences")}
              stateName="experiences"
              langType="Register"
              disabled={true}
              screen={"jobDetails"}
            />
          )}
          {qualifications_wanted &&
            qualifications_wanted.length > 0 &&
            this.wantedViewDisplay(
              qualifications_wanted,
              qualifications_wanted_title,
              qualifications_wanted_sub_title
            )}

          {experiences_wanted &&
            experiences_wanted.length > 0 &&
            this.wantedViewDisplay(
              experiences_wanted,
              experiences_wanted_title,
              experiences_wanted_sub_title
            )}
        </View>
      </View>
    </View>
  );

  wantedViewDisplay = (
    experiences_wanted,
    experiences_wanted_title,
    experiences_wanted_sub_title
  ) => (
    <View style={Styles.viewWantedSpace}>
      <Text style={Styles.titleExp}>{experiences_wanted_title}</Text>
      <View style={Styles.viewIconTitle}>
        <Icon
          name={Helper.splitIconName("fa-info-circle")}
          size={Matrics.ScaleValue(15)}
          color={Color.warning}
        />
        <Text style={Styles.expWantedSubTitleText}>
          {experiences_wanted_sub_title}
        </Text>
      </View>
      <View>{this.starIconcommonView(experiences_wanted)}</View>
    </View>
  );

  starIconcommonView = data => {
    return data.map(res => (
      <View style={Styles.combineView} key={`${res}`}>
        <Icon
          name="star"
          size={Matrics.ScaleValue(16)}
          color={Color.darkRed}
          type={"solid"}
        />
        <Text style={Styles.textBen}>{res}</Text>
      </View>
    ));
  };

  employerBenefits = (benefits_icons, benefits) => (
    <View style={Styles.driverGetToKnow}>
      <Text style={Styles.empBText}>
        {Helper.translation("Words.Employer benefits", "Employer benefits")}
      </Text>
      <View style={Styles.empBenefits}>
        {benefits_icons.map((res, index) => (
          <View style={Styles.iconView} key={`${res.icon_classes}`}>
            <Icon
              name={Helper.splitIconName(res.icon_classes)}
              size={Matrics.ScaleValue(20)}
              color={Color.black30}
              type={"solid"}
            />
            <Text style={Styles.iconText}>{res.name}</Text>
          </View>
        ))}
      </View>
      <View style={Styles.txtBenView}>{this.starIconcommonView(benefits)}</View>
    </View>
  );

  contactPerson = (
    contact_person,
    contact_person_position,
    contact_person_profile_image_url
  ) => (
    <View style={Styles.contactView}>
      {/* <Text style={Styles.empBText}>
        {Helper.translation("Words.Contact Person", "Contact Person")}
      </Text> */}
      <View style={Styles.advisorInfoView}>
        <View style={Styles.advisorImage}>
          <Image
            source={{
              uri:
                contact_person_profile_image_url ||
                "http://atozinandhra.com/images/icons/no_img_found.png"
            }}
            style={{
              width: Matrics.ScaleValue(60),
              height: Matrics.ScaleValue(60),
              borderRadius: Matrics.ScaleValue(30)
            }}
          />
        </View>
        <View style={Styles.advisorDtl}>
          <Text style={Styles.titleContactPerson}>
            {Helper.translation("Words.Contact Person", "Contact Person")}
          </Text>
          <Text style={Styles.advName}>{contact_person}</Text>
          <Text style={Styles.advType}>{contact_person_position}</Text>
        </View>
      </View>
    </View>
  );

  salaryInfo = (salary_range, salary_attention, salary_bounties) => {
    const { from, till } = salary_range;
    return (
      <View style={Styles.driverGetToKnow}>
        <Text style={Styles.empBText}>
          {Helper.translation(
            "Words.Salary / Compensation",
            "Salary / Compensation"
          )}
        </Text>
        <View>
          {from.amount_gross && from.amount_gross > 0 ? (
            <View style={Styles.mainViewSalary}>
              <Text style={Styles.salaryText}>
                {Helper.translation("Words.Salary", "Salary")}
                <Text style={Styles.typeSalary}>
                  {" "}
                  ({Helper.translation("Words.Minimum", "Minimum")})
                </Text>
              </Text>

              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Gross", "Gross")}:
                </Text>
                <Text style={Styles.valueText}>{from.amount_gross} €</Text>
              </View>
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Employment", "Employment")}:
                </Text>
                <Text style={Styles.valueText}>
                  {Helper.translation("Words.Full time", "Full time")}
                </Text>
              </View>
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Base", "Base")}:
                </Text>
                <Text style={Styles.valueText}>
                  {from.type === "fix"
                    ? Helper.translation("Words.Fixed salary", "Fixed salary")
                    : from.type}
                </Text>
              </View>
              {from.hours > 0 ? (
                <View style={Styles.listViewSalary}>
                  <Text style={Styles.labelText}>
                    {Helper.translation("Words.Hours", "Hours")}:
                  </Text>
                  <Text style={Styles.valueText}>{from.hours}</Text>
                </View>
              ) : null}
              {from.hourly > 0 ? (
                <View style={Styles.listViewSalary}>
                  <Text style={Styles.labelText}>
                    {Helper.translation("Words.Hourly wage", "Hourly wage")}:
                  </Text>
                  <Text style={Styles.valueText}> {from.hourly}</Text>
                </View>
              ) : null}
              {from.holidays_count ? (
                <View style={Styles.listViewSalary}>
                  <Text style={Styles.labelText}>
                    {Helper.translation("Words.Holidays", "Holidays")}:
                  </Text>
                  <Text style={Styles.valueText}>{from.holidays_count}</Text>
                </View>
              ) : null}
              {from.vacation_bonus ? (
                <View style={Styles.listViewSalary}>
                  <Text style={Styles.labelText}>
                    {Helper.translation("Words.Holiday pay", "Holiday pay")}:
                  </Text>
                  <Text style={Styles.valueText}>{from.vacation_bonus}</Text>
                </View>
              ) : null}

              {from.christmas_bonus ? (
                <View style={Styles.listViewSalary}>
                  <Text style={Styles.labelText}>
                    {Helper.translation(
                      "Words.Christmas bonus",
                      "Christmas bonus"
                    )}
                    :
                  </Text>
                  <Text style={Styles.valueText}>{from.christmas_bonus}</Text>
                </View>
              ) : null}
            </View>
          ) : null}
          <View style={Styles.mainViewSalary}>
            <Text style={Styles.salaryText}>
              {Helper.translation("Words.Salary", "Salary")}
              <Text style={Styles.typeSalary}>
                {" "}
                ({Helper.translation("Words.Maximum", "Maximum")})
              </Text>
            </Text>

            <View style={Styles.listViewSalary}>
              <Text style={Styles.labelText}>
                {Helper.translation("Words.Gross", "Gross")}:
              </Text>
              <Text style={Styles.valueText}>{till.amount_gross} €</Text>
            </View>
            <View style={Styles.listViewSalary}>
              <Text style={Styles.labelText}>
                {Helper.translation("Words.Employment", "Employment")}:
              </Text>
              <Text style={Styles.valueText}>
                {Helper.translation("Words.Full time", "Full time")}
              </Text>
            </View>
            <View style={Styles.listViewSalary}>
              <Text style={Styles.labelText}>
                {Helper.translation("Words.Base", "Base")}:
              </Text>
              <Text style={Styles.valueText}>
                {from.type === "fix"
                  ? Helper.translation("Words.Fixed salary", "Fixed salary")
                  : till.type}
              </Text>
            </View>
            {from.hours > 0 ? (
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Hours", "Hours")}:
                </Text>
                <Text style={Styles.valueText}>{till.hours}</Text>
              </View>
            ) : null}
            {from.hourly > 0 ? (
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Hourly wage", "Hourly wage")}:
                </Text>
                <Text style={Styles.valueText}> {till.hourly}</Text>
              </View>
            ) : null}
            {from.holidays_count ? (
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Holidays", "Holidays")}:
                </Text>
                <Text style={Styles.valueText}>{till.holidays_count}</Text>
              </View>
            ) : null}
            {from.vacation_bonus ? (
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation("Words.Holiday pay", "Holiday pay")}:
                </Text>
                <Text style={Styles.valueText}>{till.vacation_bonus}</Text>
              </View>
            ) : null}

            {from.christmas_bonus ? (
              <View style={Styles.listViewSalary}>
                <Text style={Styles.labelText}>
                  {Helper.translation(
                    "Words.Christmas bonus",
                    "Christmas bonus"
                  )}
                  :
                </Text>
                <Text style={Styles.valueText}>{till.christmas_bonus}</Text>
              </View>
            ) : null}
          </View>
          <View>
            <Text style={Styles.attentionNotes}>
              <Text style={Styles.textAttension}>Attention: </Text>
              {salary_attention}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  getDetails(id) {
    Events.trigger("loading", true);
    APICaller(`${Http.detailsEndPoint}/${id}`, "GET", global.apiToken).then(
      json => {
        if (json) {
          if (json.status && json.status !== GlobalVar.responseSuccess) {
            Events.trigger(
              "toast",
              Helper.translation(
                `Words.${GlobalVar.requestFailedMsg}`,
                GlobalVar.requestFailedMsg
              )
            );
            return;
          }
          const data = json.data.data;
          this.setState({
            detailsData: data
          });
          Events.trigger("loading", false);
        }
      }
    );
  }

  confirmAndOffer() {
    Events.trigger("loading", true);
    APICaller(
      `${Http.confirmOfferEndPoint(this.offerId)}`,
      "POST",
      global.apiToken
    ).then(json => {
      if (json) {
        if (json.status && json.status !== GlobalVar.responseSuccess) {
          const errors = json.data.errors;
          Events.trigger("toast", `${errors}`);
          return;
        }
        this.state.detailsData.is_already_unlocked = json.data.message || "";
        Events.trigger("loading", false);
        Helper.customTrackEvent("ContactIsEligibleForUnlock");
      }
    });
  }

  acceptRejectOffer(type, offer_token) {
    Events.trigger("loading", true);
    APICaller(
      `${Http.acceptRejectOfferEndPoint}/${type}/${offer_token}`,
      "POST",
      global.apiToken
    ).then(json => {
      if (json) {
        if (json.status && json.status !== GlobalVar.responseSuccess) {
          const errors = json.data.errors;
          errors
            ? Events.trigger("toast", `${errors}`)
            : Events.trigger(
                "toast",
                Helper.translation(
                  `Words.${GlobalVar.requestFailedMsg}`,
                  GlobalVar.requestFailedMsg
                )
              );
          return;
        }
        this.state.detailsData.offer_text = json.data.message || "";
        Events.trigger("loading", false);
        Events.trigger("refreshOfferScreen", "offerr");
      }
    });
  }

  tabUIView = activeTab => (
    <View style={Styles.tabMainView}>
      <TouchableOpacity
        style={[Styles.tabView, activeTab === "1" && Styles.activeTab]}
        onPress={() => this.overViewTabPress()}
      >
        <Text
          style={[Styles.tabText, activeTab === "1" && Styles.activeTabText]}
        >
          {Helper.translation("Words.Overview", "Overview")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Styles.tabView, activeTab === "2" && Styles.activeTab]}
        onPress={() => this.reviewTabPress()}
      >
        <Text
          style={[Styles.tabText, activeTab === "2" && Styles.activeTabText]}
        >
          {Helper.translation("Words.Review", "Review")}{" "}
          {this.state.detailsData &&
            this.state.detailsData.reviews.length > 0 &&
            `(${this.state.detailsData.reviews.length})`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  overViewTabPress() {
    this.setState({
      activeTab: "1"
    });
  }

  reviewTabPress() {
    this.setState({
      activeTab: "2"
    });
  }

  reviewCategory = data => {
    return (
      <View style={Styles.categoryMainView}>
        {data.map((res, index) => {
          return (
            <View key={index.toString()}>
              <View style={Styles.reviewCategoryView}>
                <Text style={Styles.reviewCategotyTiteText}>
                  {res.identifier}
                </Text>
                <View style={Styles.ratingStarView}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={Matrics.ScaleValue(18)}
                    rating={res.rating}
                    fullStarColor={Color.darkRed}
                    starStyle={Styles.starView}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    const { activeMap, detailsData, rejectStateModal, activeTab } = this.state;
    const {
      benefits,
      other_benefits,
      qualifications,
      experiences,
      qualifications_wanted,
      experiences_wanted,
      is_open_offer,
      is_already_unlocked,
      campaign_video_link,
      offer_text,
      offer_token,
      salary_range,
      salary_attention,
      salary_bounties,
      badge_company,
      reviews
    } = detailsData;
    return (
      <SafeAreaView style={Styles.mainContainer}>
        <ScrollView style={Styles.detailView}>
          {detailsData ? this.jobTitleView(detailsData) : null}
          <View style={Styles.thirdViewStyles}>
            {this.tabUIView(activeTab)}
            {activeTab === "1" ? (
              <View>
                {this.distanceRender(activeMap, detailsData)}
                {campaign_video_link ? (
                  <WebView
                    style={{
                      height: Matrics.screenWidth / 2.2,
                      marginTop: Matrics.ScaleValue(10)
                    }}
                    source={{
                      uri: `${campaign_video_link}`
                    }}
                  />
                ) : null}
                {salary_range
                  ? this.salaryInfo(
                      salary_range,
                      salary_attention,
                      salary_bounties
                    )
                  : null}
                {this.informationView(detailsData)}
                {this.qualificationView(
                  qualifications,
                  experiences,
                  qualifications_wanted,
                  experiences_wanted,
                  detailsData.qualifications_wanted_title,
                  detailsData.qualifications_wanted_sub_title,
                  detailsData.experiences_wanted_title,
                  detailsData.experiences_wanted_sub_title
                )}
                {benefits && benefits.length > 0
                  ? this.employerBenefits(benefits, other_benefits)
                  : null}
              </View>
            ) : (
              <View>
                <View style={Styles.staticView}>
                  <Text style={Styles.textReviewStatic}>
                    {Helper.translation(
                      "Words.These reviews are from individuals who make an offer of",
                      "These reviews are from individuals who make an offer of"
                    )}{" "}
                    <Text style={{ fontFamily: Fonts.type.RubikBold }}>
                      {badge_company.name}
                    </Text>{" "}
                    {Helper.translation(
                      "Words.Have accepted",
                      "Have accepted."
                    )}
                  </Text>
                </View>
                {/*  */}
                {reviews &&
                  reviews.map(res => (
                    <View style={Styles.fullReview} key={`res_${res.id}`}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Text style={Styles.userName}>
                            {res.creator.anonymized_name}
                          </Text>
                          <Text style={Styles.dateText}>
                            {moment(res.created_at, "YYYY/MM/DD").format(
                              "DD.MM.YYYY"
                            )}
                          </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                          <Text style={Styles.starRatingCount}>
                            {res.rating}
                          </Text>
                          <View style={Styles.ratingStarView}>
                            <StarRating
                              disabled={true}
                              maxStars={5}
                              starSize={Matrics.ScaleValue(18)}
                              rating={res.rating}
                              fullStarColor={Color.darkRed}
                              starStyle={Styles.starView}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={Styles.mainRatingView}>
                        {res.ratings &&
                          res.ratings.length > 0 &&
                          this.reviewCategory(res.ratings)}
                      </View>
                      <View>
                        <Text style={Styles.reviewText}>{res.review}</Text>
                      </View>
                    </View>
                  ))}

                {/*  */}
              </View>
            )}
          </View>
        </ScrollView>
        {is_already_unlocked && !is_open_offer && !offer_text ? (
          <View style={Styles.unlockedView}>
            <Text style={Styles.alreadyUnlockText}>{is_already_unlocked} </Text>
          </View>
        ) : null}
        {!is_open_offer &&
        !is_already_unlocked &&
        detailsData &&
        !offer_text ? (
          <BottomButton
            buttonText={Helper.translation(
              "Words.Confirm an offer!",
              "Confirm an offer!"
            )}
            color={Color.darkRed}
            onPress={() => this.confirmAndOffer()}
          />
        ) : null}
        {offer_text ? (
          <View style={Styles.unlockedView}>
            <Text style={Styles.alreadyUnlockText}>{offer_text} </Text>
          </View>
        ) : null}
        {detailsData && is_open_offer && !offer_text ? (
          <View style={Styles.viewDirection}>
            <BottomButton
              buttonText={Helper.translation("Words.Accept", "Accept")}
              color={Color.darkRed}
              onPress={() => this.acceptRejectOffer("accept", offer_token)}
              customStyle={Styles.acceptBtn}
            />
            <BottomButton
              buttonText={Helper.translation("Words.Reject", "Reject")}
              color={Color.darkRed}
              customStyle={Styles.rejectBtn}
              onPress={() => {
                Events.trigger("loading", true);
                this.setState({ rejectStateModal: true });
              }}
            />
          </View>
        ) : null}
        {Platform.OS === "ios" ? <BottomBG color={Color.darkRed90} /> : null}
        {rejectStateModal ? (
          <RejectModal
            visible={rejectStateModal}
            closeModalReq={val => this.setState({ rejectStateModal: false })}
            offer_token={offer_token}
          />
        ) : null}
      </SafeAreaView>
    );
  }
}
