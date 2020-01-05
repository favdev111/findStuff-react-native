import React from 'react'
import {Dimensions, View} from 'react-native'
import Tabs from 'react-native-tabs'
import Style from './CustomTabsStyle'
// import PropTypes from 'prop-types'
import {Fonts} from 'src/Theme'

const pixelWidth = require('string-pixel-width')

const {width} = Dimensions.get('window')

export default class CustomTabs extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      // margin: 0,
    }
  }

  goToTab(index) {
    this.tabBarRef.goToTab(index)
  }

  componentDidMount() {
    const {tabs} = this.props
    this.getTotalItemWidth(tabs)
  }

  onChangeTab = (e) => {
    const {onChange, isPreviewPromotion} = this.props
    if (onChange) {
      if (isPreviewPromotion) {
        if (e.tabName !== 'whenExpanded') {
          return
        }
      }
      onChange()
    }
  }
  renderScreens = (tab, index) => {
    const {screens} = this.props
    return screens[index]
  }

  getTitleWidth = (title) => {
    // console.log(title.title.length)
    // titleWidth
    return pixelWidth(title.title, {
      font: Fonts.fonts.PoppinsBold,
      // size: title.title.length >= 10 ? Metrics.applyRatio(28) : Metrics.applyRatio(18),
      // size: Metrics.applyRatio(18),
      bold: false,
      italic: false,
    })
  }
  getTotalItemWidth = (tabs) => {
    let totalWidth = 0
    tabs.map((title, index) => {
      totalWidth += this.getTitleWidth(title)
    })
    if (totalWidth >= width) {
      this.setState({
        width: width,
        // margin: 0,
      })
    } else {
      this.setState({
        width: totalWidth,
        // margin: (width - totalWidth) / 2,
      })
    }
  }

  render() {
    const {
      tabs,
      initialPage,
      animationTabBarStyle,
      tabBarBackgroundColor,
      tabBarActiveTextColor,
      tabBarInactiveTextColor,
      tabBarTextStyle,
      // tabBarUnderlineStyle,
      withHeaderBar,
    } = this.props
    const {width} = this.state
    if (withHeaderBar) {
      return (
        <View style={Style.container}>
          <View style={Style.positionTab}>
            <Tabs
              ref={(ref) => {
                this.tabBarRef = ref
              }}
              tabs={tabs}
              initialPage={initialPage || 0}
              onChange={this.onChangeTab}
              // tabBarUnderlineStyle={tabBarUnderlineStyle}
              tabBarBackgroundColor={tabBarBackgroundColor}
              tabBarActiveTextColor={tabBarActiveTextColor}
              tabBarInactiveTextColor={tabBarInactiveTextColor}
              tabBarTextStyle={tabBarTextStyle}
              renderUnderline={null}
              renderTabBar={(props) => (
                <View style={[Style.tabBarContainer, animationTabBarStyle]}>
                  <View style={Style.tabBarBottomAround} />
                  <View style={{width: width}}>
                    <Tabs.DefaultTabBar {...props} tabBarContainerWidth={width} />
                  </View>
                </View>
              )}>
              {this.renderScreens}
            </Tabs>
          </View>
        </View>
      )
    } else {
      return (
        <View style={Style.container}>
          <Tabs
            ref={(ref) => {
              this.tabBarRef = ref
            }}
            tabs={tabs}
            initialPage={initialPage || 0}
            onChange={this.onChangeTab}
            // tabBarUnderlineStyle={tabBarUnderlineStyle}
            tabBarBackgroundColor={tabBarBackgroundColor}
            tabBarActiveTextColor={tabBarActiveTextColor}
            tabBarInactiveTextColor={tabBarInactiveTextColor}
            tabBarTextStyle={tabBarTextStyle}
            renderTabBar={(props) => (
              <View style={{width: width}}>
                <Tabs.DefaultTabBar {...props} tabBarContainerWidth={width} />
              </View>
            )}>
            {this.renderScreens}
          </Tabs>
        </View>
      )
    }
  }
}

// CustomTabs.propTypes = {
//   tabs: PropTypes.array,
//   screens: PropTypes.array,
//   initialPage: PropTypes.number,
//   onChange: PropTypes.func,
//   animationTabBarStyle: PropTypes.any,
//   tabBarBackgroundColor: PropTypes.any,
//   tabBarActiveTextColor: PropTypes.any,
//   tabBarInactiveTextColor: PropTypes.any,
//   tabBarTextStyle: PropTypes.object,
//   tabBarUnderlineStyle: PropTypes.object,
//   withHeaderBar: PropTypes.bool,
//   isPreviewPromotion: PropTypes.bool,
//   //   isShadowViewInTab: PropTypes.bool,
// }
