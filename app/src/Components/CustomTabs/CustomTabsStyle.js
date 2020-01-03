import {StyleSheet} from 'react-native'
import ApplicationStyles from 'src/Theme/ApplicationStyles'
import {Metrics, Colors} from 'src/Theme'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
  },
  positionTab: {
    bottom: Metrics.applyRatio(0),
    position: 'absolute',
    top: Metrics.applyRatio(-10),
  },
  shadowView: {
    ...ApplicationStyles.tabShadow,
  },
  tabBarBottomAround: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(23),
    borderBottomRightRadius: Metrics.applyRatio(23),
    height: Metrics.ANIMATION_TAB_HEIGHT,
    position: 'absolute',
    top: 0,
    width: Metrics.applyRatio(375),
  },
  tabBarContainer: {
    backgroundColor: Colors.transparent,
    marginBottom: -1,
  },
})
