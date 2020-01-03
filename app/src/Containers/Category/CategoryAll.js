import React from 'react'
import {View} from 'react-native'
// import {PropTypes} from 'prop-types'
// import CustomHeader from 'src/Components/CustomHeader'
import Style from './CategoryAllStyle'
import CustomTabs from 'src/Components/CustomTabs/CustomTabs'
import {ApplicationStyles, Colors} from 'src/Theme'
import GetCategory from './GetCategory/GetCategory'
import FindCategory from './FindCategory/FindCategory'
// import EventEmitter from 'src/Services/EventEmitter'

export default class CategoryAll extends React.Component {
  constructor(props) {
    super(props)
    const activeTab = this.props.navigation.dangerouslyGetParent().getParam('activeTab')
    this.state = {
      initailPage: activeTab || 0,
      allRefresh: false,
    }
  }

  tabs = [
    {title: 'FindCategory'},
    {title: 'GetCategory'}
  ]

//   componentDidMount() {
//     this._subscriptionDidFocus = this.props.navigation.addListener('didFocus', () => {
//       this.walletTabRef && this.walletTabRef.reload()
//       const activeTab = this.props.navigation.dangerouslyGetParent().getParam('activeTab')
//       if (activeTab === 2) {
//         this.tabsRef.goToTab(activeTab)
//         this.ApprovalTabRef && this.ApprovalTabRef.reload()
//       }
//     })
//     this._subscriptionRefocus = this.props.navigation.addListener('refocus', () => {
//       this.transactionTabRef && this.walletTabRef.reload()
//     })
//     EventEmitter.emitter.addListener(
//       'refreshWallView',
//       () => {
//         this.setState({allRefresh: !this.state.allRefresh})
//       },
//       null,
//     )
//   }

  renderGetCategoryView = () => {
    return (
      <GetCategory
        ref={(ref) => {
          this.getCatTabRef = ref
        }}
        allRefresh={this.state.allRefresh}
      />
    )
  }

  renderFindCategoryView = () => {
    return (
      <FindCategory
        ref={(ref) => {
          this.findCatTabRef = ref
        }}
        allRefresh={this.state.allRefresh}
      />
    )
  }

  render() {
    return (
      <View style={Style.container}>
        {/* <CustomHeader leftComponent="CustomerMenu" rightComponent="bellAndProfile" /> */}
        <CustomTabs
          ref={(ref) => {
            this.tabsRef = ref
          }}
          tabs={this.tabs}
          initialPage={this.state.initailPage}
          tabBarStyle={Style.tabBarStyle}
          tabBarBackgroundColor={Colors.white}
          tabBarActiveTextColor={Colors.active}
          tabBarInactiveTextColor={Colors.inActive}
          tabBarTextStyle={ApplicationStyles.tabTextStyle}
          tabBarUnderlineStyle={ApplicationStyles.underLineTabDuo}
          screens={[
            this.renderGetCategoryView(),
            this.renderFindCategoryView()
          ]}
          withHeaderBar
        />
      </View>
    )
  }
}

// WalletView.propTypes = {
//   navigation: PropTypes.shape({
//     addListener: PropTypes.func.isRequired,
//     isFocused: PropTypes.func.isRequired,
//     dangerouslyGetParent: PropTypes.func.isRequired,
//   }).isRequired,
// }
