import React, { Component } from "react";
import { View, FlatList, RefreshControl, Text } from "react-native";
import { Header, LoadMoreComponent } from "../../../common/components";
import Styles from "./styles";
import List from "../../../common/components/list-of-job";
import GlobalVar from "../../../global";
import { APICaller, Events, Helper } from "../../../util";
import Http from "../../../api/http";

export default class Job extends Component {
  static navigationOptions = ({ navigation }) =>
    Header(navigation, Helper.translation("Words.Job", "Job"));

  state = {
    loadingData: false,
    loadMore: false,
    isRefreshing: false,
    jobArr: []
  };

  navigateDetailScreen = (navigation, id) => {
    navigation.navigate("JobDetail", { id });
  };

  componentDidMount() {
    Helper.trackScreenView("JobScreen");
    this.pageNo = 1;
    this.fetchJobList();
    // For Developer option
    Events.on("developerOption", "Dashboard", () => {
      this.fetchJobList();
    });
  }

  fetchJobList() {
    const { isRefreshing, loadMore } = this.state;
    if (!isRefreshing && !loadMore) {
      Events.trigger("loading", true);
    }

    APICaller(
      `${Http.jobPostsEndPoint}?page=${this.pageNo}`,
      "GET",
      global.apiToken
    ).then(json => {
      if (json) {
        console.log(json, "json");
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
        if (json && json.status && json.status === GlobalVar.responseSuccess) {
          const resp = json.data;
          if (isRefreshing) {
            this.setState({
              jobArr: resp.data,
              isRefreshing: false,
              loadingData: true
            });
          } else {
            this.setState({
              jobArr: [...this.state.jobArr, ...resp.data],
              loadMore: false,
              loadingData: true
            });
            Events.trigger("loading", false);
          }
          this.pageNo = resp.meta.current_page + 1;
          this.lastPage = resp.meta.last_page;
        }
      }
    });
  }

  handleLoadMore = async () => {
    if (!this.state.loadMore) {
      await this.setState({
        loadMore: true
      });
      if (this.lastPage >= this.pageNo) {
        this.fetchJobList(); // method for API call
      }
    }
  };

  async onRefresh() {
    this.pageNo = 0;
    await this.setState({
      isRefreshing: true
    });
    this.fetchJobList(); // method for API call
  }

  listEmptyComponent = loadingData => {
    if (!loadingData) {
      return <View />;
    }
    return <EmptyComponent message={"No job posts found"} />;
  };

  listFooterComponent = loadMore => {
    return <LoadMoreComponent loadMore={loadMore} />;
  };

  flatListRender = () => {
    const { navigation } = this.props;
    const { jobArr, loadingData, loadMore } = this.state;
    return (
      <FlatList
        data={jobArr}
        contentContainerStyle={Styles.containerStyles}
        renderItem={({ item }) => (
          <List
            onPress={() =>
              this.navigateDetailScreen(navigation, item.job_post_id)
            }
            data={item}
            key={`${item.job_post_id}`}
          />
        )}
        style={Styles.flatLsitStyles}
        extraData={this.state}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.8}
        onEndReached={this.handleLoadMore.bind(this)}
        ListEmptyComponent={() => this.listEmptyComponent(loadingData)}
        ListFooterComponent={() => this.listFooterComponent(loadMore)}
      />
    );
  };

  render() {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.flatlistView}>{this.flatListRender()}</View>
      </View>
    );
  }
}
