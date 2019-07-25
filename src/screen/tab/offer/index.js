import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import SegmentControl from "../../../common/components/segment";
import { Color } from "../../../common/styles";
import Styles from "./styles";
import { Header } from "../../../common/components";
import NewOffer from "../../offer-types";
import Http from "../../../api/http";
import { Helper, Events, APICaller } from "../../../util";

class Offer extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(navigation, Helper.translation("Words.Offer", "Offer"));
  state = {
    loadingData: false,
    loadMore: false,
    isRefreshing: false,
    offerArr: [],
    pageNo: 1,
    open: [],
    accepted: [],
    rejected: [],
    expired: []
  };
  componentDidMount() {
    Helper.trackScreenView("OfferScreen");
    this.pageNo = 1;
    this.commonFetchOffer();
    Events.on("refreshOfferScreen", "offer", res => {
      this.pageNo = 1;
      this.state.isRefreshing = true;
      this.commonFetchOffer();
    });
  }

  commonFetchOffer() {
    this.fetchOffer(this.pageNo, "open");
    this.fetchOffer(this.pageNo, "accepted");
    this.fetchOffer(this.pageNo, "rejected");
    this.fetchOffer(this.pageNo, "expired");
  }

  fetchOffer(pageNo, type) {
    this.offerType = type;
    const { isRefreshing, loadMore } = this.state;
    if (!isRefreshing && !loadMore) {
      Events.trigger("loading", true);
    }
    APICaller(
      `${Http.offerEndPoint}/${type}?page=${pageNo}`,
      "GET",
      global.apiToken
    ).then(json => {
      if (json) {
        const resp = json.data;
        if (isRefreshing) {
          this.setState({
            [type]: resp.data,
            isRefreshing: false,
            loadingData: true
          });
          Events.trigger("loading", false);
        } else {
          this.setState({
            [type]: [...this.state[type], ...resp.data],
            loadMore: false,
            loadingData: true
          });
          Events.trigger("loading", false);
        }
        this.pageNo = resp.meta.current_page + 1;
        this.lastPage = resp.meta.last_page;
      }
    });
  }

  handleLoadMore = offerType => {
    if (!this.state.loadMore) {
      this.setState({
        loadMore: true
      });
      if (this.lastPage >= this.pageNo) {
        this.fetchOffer(this.pageNo, offerType); // method for API call
        Events.trigger("loading", false);
      } else {
        this.setState({
          loadMore: false
        });
      }
    }
  };

  async onRefresh(type) {
    this.pageNo = 1;
    await this.setState({
      isRefreshing: true
    });
    this.fetchOffer(this.pageNo, type); // method for API call
  }

  render() {
    const { navigation } = this.props;
    const {
      open,
      accepted,
      rejected,
      expired,
      loadingData,
      loadMore
    } = this.state;
    const segments = [
      {
        title: Helper.translation("Words.Open", "Open"),
        view: (
          <NewOffer
            navigation={navigation}
            type={"open"}
            data={open}
            handleLoadMore={() => this.handleLoadMore("open")}
            onRefresh={() => this.onRefresh("open")}
            loadingData={loadingData}
            loadMore={loadMore}
          />
        )
      },
      {
        title: Helper.translation("Words.Accepted", "Accepted"),
        view: (
          <NewOffer
            navigation={navigation}
            type={"accepted"}
            data={accepted}
            handleLoadMore={() => this.handleLoadMore("accepted")}
            onRefresh={() => this.onRefresh("accepted")}
            loadingData={loadingData}
            loadMore={loadMore}
          />
        )
      },
      {
        title: Helper.translation("Words.Rejected", "Rejected"),
        view: (
          <NewOffer
            navigation={navigation}
            type={"rejected"}
            data={rejected}
            handleLoadMore={() => this.handleLoadMore("rejected")}
            onRefresh={() => this.onRefresh("rejected")}
            loadingData={loadingData}
            loadMore={loadMore}
          />
        )
      },
      {
        title: Helper.translation("Words.Expired", "Expired"),
        view: (
          <NewOffer
            navigation={navigation}
            type={"expired"}
            data={expired}
            handleLoadMore={() => this.handleLoadMore("expired")}
            onRefresh={() => this.onRefresh("expired")}
            loadingData={loadingData}
            loadMore={loadMore}
          />
        )
      }
    ];
    return (
      <View style={Styles.mainContainer}>
        <SegmentControl
          segments={segments}
          color={Color.darkRed}
          textColor={Color.darkRed}
        />
      </View>
    );
  }
}

export default Offer;
