import React, { Component } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import Styles from "./styles";
import List from "../../common/components/list-of-offer";
import { EmptyComponent, LoadMoreComponent } from "../../common/components";
//import Helper from "../../util/helper";
import { APICaller, Events, Helper } from "../../util";
import Http from "../../api/http";

class NewOffer extends Component {
  state = {
    loadingData: false,
    loadMore: false,
    isRefreshing: false,
    offerArr: [],
    pageNo: 1
  };

  navigateDetailScreen = (navigation, id) => {
    navigation.navigate("JobDetail", { id });
  };

  componentDidMount() {
    Helper.trackScreenView("OfferScreen");
  }

  listEmptyComponent = loadingData => {
    if (!loadingData) {
      return <View />;
    }
    return <EmptyComponent message={"No offer found"} />;
  };

  listFooterComponent = loadMore => {
    return <LoadMoreComponent loadMore={loadMore} />;
  };

  flatListRender = (data, handleLoadMore, onRefresh) => {
    const { navigation, loadingData, loadMore } = this.props;
    return (
      <FlatList
        data={data}
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
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        ListEmptyComponent={() => this.listEmptyComponent(loadingData)}
        ListFooterComponent={() => this.listFooterComponent(loadMore)}
      />
    );
  };

  render() {
    const { data, handleLoadMore, onRefresh } = this.props;
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.flatlistView}>
          {this.flatListRender(data, handleLoadMore, onRefresh)}
        </View>
      </View>
    );
  }
}
export default NewOffer;
