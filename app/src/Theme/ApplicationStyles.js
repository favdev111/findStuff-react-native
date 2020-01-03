import {Metrics, Colors, Fonts} from './index'

// import Fonts from './Fonts'

/**
 * This file defines the base application Style.
 *
 * Use it to define generic component Style (e.g. the default text Style, default button Style...).
 */

export default {
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  tabBarStyle: {
    flex: 1,
    height: undefined,
  },
  screen: {
    container: {
      flex: 1,
    },
    containerRow: {
      flexDirection: 'row',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
  },
  backIcon: {
    justifyContent: 'center',
    height: Metrics.applyRatio(21),
    // marginLeft: Metrics.applyRatio(0),
    width: Metrics.applyRatio(12),
  },
  backIconWrapper: {
    alignItems: 'center',
    paddingHorizontal: Metrics.applyRatio(20),
    paddingVertical: Metrics.applyRatio(18),
  },
  icon: {
    height: Metrics.applyRatio(18),
    width: Metrics.applyRatio(18),
  },
  inputStyle: {
    height: Metrics.applyRatio(55),
    width: Metrics.applyRatio(333),
    borderRadius: Metrics.applyRatio(17),
    backgroundColor: Colors.greyInput,
    marginTop: Metrics.applyRatio(5),
    marginBottom: Metrics.applyRatio(20),
    ...Fonts.style.textInput,
    // marginHorizontal: Metrics.DEVICE_WIDTH * 0.02,
  },
  inputStyleWithoutFontStyle: {
    height: Metrics.applyRatio(55),
    width: Metrics.applyRatio(333),
    borderRadius: Metrics.applyRatio(17),
    backgroundColor: Colors.greyInput,
    marginTop: Metrics.applyRatio(5),
    marginBottom: Metrics.applyRatio(20),
    ...Fonts.style.textInputWithoutFontStyle,
    // marginHorizontal: Metrics.DEVICE_WIDTH * 0.02,
  },
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    // borderColor: Colors.black2,
    // borderWidth: 1,
    justifyContent: 'center',
    width: Metrics.applyRatio(240),
    height: Metrics.applyRatio(46),
    borderRadius: Metrics.applyRatio(23),
    backgroundColor: Colors.blueValidation,
  },
  textButton: {
    ...Fonts.style.validationButtonText,
  },
  buttonTitle: {
    ...Fonts.style.buttonTitle,
  },
  clickableTextContainer: {
    alignSelf: 'center',
    width: Metrics.applyRatio(240),
  },
  clickableText: {
    ...Fonts.style.messageBold,
    color: Colors.black,
  },
  locationBoxFirstStyle: {
    borderColor: Colors.greyDivider,
    borderStyle: 'solid',
    borderRadius: Metrics.applyRatio(8.4),
    borderWidth: 1,
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.xdsmall,
    marginRight: Metrics.applyRatio(10),
    paddingHorizontal: Metrics.applyRatio(8),
    paddingTop: Metrics.applyRatio(5),
    paddingBottom: Metrics.applyRatio(5),
    lineHeight: Metrics.applyRatio(12),
    height: Metrics.applyRatio(24),
  },
  locationBoxSecondStyle: {
    borderColor: Colors.greyDivider,
    borderStyle: 'solid',
    borderRadius: Metrics.applyRatio(8.4),
    borderWidth: 1,
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.xdsmall,
    marginRight: Metrics.applyRatio(10),
    paddingHorizontal: Metrics.applyRatio(8),
    paddingTop: Metrics.applyRatio(5),
    paddingBottom: Metrics.applyRatio(5),
    lineHeight: Metrics.applyRatio(12),
    height: Metrics.applyRatio(24),
  },
  locationBoxThirdStyle: {
    borderColor: Colors.greyDivider,
    borderStyle: 'solid',
    borderRadius: Metrics.applyRatio(9),
    borderWidth: 1,
    color: Colors.greyishBrown,
    fontFamily: Fonts.fonts.PoppinsRegular,
    fontSize: Fonts.size.xxsmall,
    marginRight: Metrics.applyRatio(5),
    paddingBottom: Metrics.applyRatio(3),
    paddingHorizontal: Metrics.applyRatio(7),
    paddingTop: Metrics.applyRatio(3),
    lineHeight: Metrics.applyRatio(11),
  },
  tabTextStyle: {
    fontFamily: Fonts.fonts.PoppinsBold,
    fontSize: Fonts.size.medium,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  underLineTab: {
    height: Metrics.applyRatio(2),
    width: Metrics.applyRatio(91),
    marginLeft: Metrics.applyRatio(15),
  },
  underLineTabDuo: {
    height: Metrics.applyRatio(2),
    width: Metrics.applyRatio(58),
    marginLeft: Metrics.applyRatio(65),
  },
  splashScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00caca',
  },
  shadowView: {
    shadowColor: Colors.shadowColor,
    // android
    elevation: 10,
    // ios
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 51,
    shadowRadius: 10,
  },
  smallShadowView: {
    shadowColor: Colors.shadowColor,
    // android
    elevation: 4,
    // ios
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  //   headerShadow: {
  //     elevation: Metrics.applyRatio(15),
  //     shadowColor: Colors.shadowColor,
  //     shadowOffset: {
  //       width: 0,
  //       height: Metrics.applyRatio(3),
  //     },
  //     shadowOpacity: Metrics.applyRatio(1),
  //     shadowRadius: Metrics.applyRatio(49),
  //   },
  //   tabShadow: {
  //     elevation: Metrics.applyRatio(10),
  //     shadowColor: Colors.shadowColor,
  //     shadowOffset: {
  //       width: 0,
  //       height: Metrics.applyRatio(8),
  //     },
  //     shadowOpacity: Metrics.applyRatio(29),
  //     shadowRadius: Metrics.applyRatio(5),
  //   },
}
