import {StyleSheet, Dimensions} from 'react-native'
export default StyleSheet.create({
   AddInfoModalContainer: {
      margin: 0,
   },
   AddInfoBannerImg: {
      width: 300,
      height: 130,
   },
   AddInfoBannerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
   }, 
   AddInfoHeader: {
      width: Dimensions.get('window').width,
      height: 50,
      backgroundColor: '#0084da',
      alignItems: 'center',
      justifyContent: 'center',
   },
   AddInfoBtnContainer: {
      flex: 1,
   },
   AddBtnWrap: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   FindBtnImg: {
      width: 60,
      height: 60
   },
   GetBtnImg: {
      width: 60,
      height: 60
   },
   CloseImg: {
        width: 50,
        height: 50
    },
    CloseBtnWrap: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
    }
})