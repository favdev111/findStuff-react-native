import React, {Component} from 'react'
import {Text, View, FlatList, RefreshControl} from 'react-native'
import Style from './GetCategoryStyle'
import Spinner from 'react-native-loading-spinner-overlay'
// import Moment from 'moment'
// import EventEmitter from 'App/Services/EventEmitter'

export default class GetCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      book: null,
      spinner: false,
      refreshing: true,
    }
    // this._fetchPromotions()
  }
//   _fetchPromotions = () => {
//     return PromotionService.getLoggedCustomerPendingOnlineRedemptions().then((res) => {
//       this.setState(
//         {
//           book: res.data.loggedCustomerPendingOnlineRedemptions,
//         },
//         () => {
//           this.setState({loading: false, refreshing: false})
//         },
//       )
//     })
//   }

  _onRefresh = () => {
    this.reload(true)
    // EventEmitter.emitter.emit('refreshWallView')
  }

  reload = (refreshing = false) => {
    // this.setState({loading: true})
    // this.setState({loading: !refreshing, refreshing: refreshing}, () => this._fetchPromotions())
  }
  // componentWillReceiveProps(nextProps) {
  //   this.reload(true)
  // }
  _scrollOffset = 0
  _handleScroll = (event) => {
    this._scrollOffset = event.nativeEvent.contentOffset.y
  }
  keyExtractor = (item) => item.uuid.toString()
  _renderListItem = (listItem) => {
    return (
      <View>
          <Text> This is test</Text>
          <Text> This is test</Text>
      </View>
    )
  }
  render() {
    return (
      <View>
        {this.state.loading ? (
          <Spinner visible={this.state.loading} />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
            }
            data={this.state.book}
            extraData={this.state}
            keyExtractor={(item, index) => item + index}
            renderItem={this._renderListItem}
          />
        )}
      </View>
    )
  }
}
