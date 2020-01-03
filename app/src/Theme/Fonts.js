import {Colors} from './index'
import Metrics from 'src/Theme/Metrics'
function applyRatio(pointsSize) {
  return pointsSize * 1
}

function applyRatioInterSpacing(interSize) {
  return interSize / 100
}

const size = {
  max: applyRatio(40),
  h1: applyRatio(38),
  h2: applyRatio(36),
  h2inter: applyRatio(34),
  h3: applyRatio(28),
  h4: applyRatio(24),
  h5: applyRatio(20),
  xxbig: applyRatio(48),
  xbig: applyRatio(44),
  big: applyRatio(20),
  bigXMedium: applyRatio(15),
  biggMedium: applyRatio(18),
  bigMedium: applyRatio(16),
  regular: applyRatio(23),
  medium: applyRatio(14),
  small: applyRatio(12),
  xsmall: applyRatio(10),
  xdsmall: applyRatio(9),
  xmsmall: applyRatio(8),
  xxsmall: applyRatio(7),
  xxsmall2: applyRatio(6),
  xxxsmall: applyRatio(5),
}
const letterSpacing = {
  xSmall: applyRatioInterSpacing(18),
  small: applyRatioInterSpacing(29),
  medium: applyRatioInterSpacing(70),
  mediumBig: applyRatioInterSpacing(90),
  big: applyRatioInterSpacing(100),
  xBig: applyRatioInterSpacing(200),
  xxBig: applyRatioInterSpacing(300),
}

const fonts = {
  PoppinsLight: 'Poppins-Light',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsSemiBold: 'Poppins-SemiBold', // fontWeight: '500'
  PoppinsBold: 'Poppins-Bold', // fontWeight: 'bold'
  PoppinsItalic: 'Poppins-Italic', // fontstyle: 'italic'
  PoppinsLightItalic: 'Poppins-LightItalic',
  PoppinsMediumItalic: 'Poppins-MediumItalic',
  PoppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
  PoppinsBoldItalic: 'Poppins-BoldItalic',
}

const style = {
  title: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.big,
    color: Colors.black1,
    // fontWeight: '500', // the fontWeight will override the given font
    fontStyle: 'normal',
    letterSpacing: letterSpacing.small,
  },
  titleReguler: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.big,
    // color: Colors.black1,
    color: Colors.blueGrey,
    fontStyle: 'normal',
    letterSpacing: letterSpacing.small,
  },
  categoryMissing: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: size.big,
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  message: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.bigMedium,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#7f7f7f',
  },
  messageBold: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.bigMedium,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.grey1,
  },
  greyInfo: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.medium,
    textAlign: 'center',
    color: Colors.grey,
  },
  subSectionTitle: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.grey4,
  },
  greyInfoDarker: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.medium,
    textAlign: 'center',
    color: Colors.grey1,
  },
  greyInfoUpperCase: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.small,
    letterSpacing: letterSpacing.xSmall,
    textAlign: 'center',
    color: Colors.grey1,
    // Please use the .toUpperCase() property on the text
  },
  email: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.biggMedium,
    letterSpacing: 0,
    color: Colors.brightBlue,
  },
  validationButtonText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.bigMedium,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  textInput: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.medium,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.black,
    paddingHorizontal: Metrics.applyRatio(20),
  },
  textInputWithoutFontStyle: {
    // fontFamily: fonts.PoppinsRegular,
    // fontSize: size.bigMedium,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0,
    // color: Colors.black,
    paddingHorizontal: Metrics.applyRatio(20),
  },
  titleSection: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: size.medium,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.black,
  },
  titleMenu: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.bigMedium,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.blueValidation,
  },
  clickableText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.medium,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.grey3,
  },
  clickableTextBold: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.medium,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.grey3,
  },
  promotionName: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: size.bigMedium,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.grey3,
  },
  captionFont: {
    color: Colors.black1,
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.xsmall,
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  withdrawText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.xsmall,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
  },
  addressDes: {
    // fontFamily: fonts.,
    fontSize: size.small,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.grey2,
  },
  buttonTitle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.bigMedium,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.white,
  },
  dropDownText: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.medium,
    fontStyle: 'normal',
    letterSpacing: 0,
    // color: Colors.grey1,
  },
  addAddress: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: size.bigMedium,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.grey1,
  },
  acoountText: {
    fontSize: size.h1,
    // fontWeight: 'bold',
  },
  offerAmount: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.max,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  approvalPending: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.Medium,
    // fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.white,
  },
  amountText: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.xxbig,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.white,
  },
  modalAmountText: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 18,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.text,
  },
  startPromotion: {
    fontFamily: fonts.PoppinsBold,
    fontSize: size.bigMedium,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
  },
}
export default {
  size,
  style,
  fonts,
  letterSpacing,
}
