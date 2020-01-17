import {StyleSheet, Dimensions} from 'react-native'
import {Colors, Images} from 'src/Theme'
export default StyleSheet.create({
   ProfileContainer: {
      backgroundColor: '#f4f6f8',
   },
   ProfileHeaderContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width/2,
      padding: 10,
   },
   ProfileHeaderTitleContainer: {
      alignItems: 'center',
      paddingTop: 10,
   },
   ProfileHeaderTitleText: {
      color: '#fff',
      fontSize: 20
   },
   ProfileHeaderAvatarContainer: {
      flexDirection: 'row',
      padding: 10,
      paddingTop: 30
   },
   ProfileHeaderAvatarWrap: {
      flexDirection: 'row',
      flex: 1,

   },
   ProfileHeaderAvatarImg: {
      width: 52,
      height: 52,
      marginRight: 10,
   },
   ProfileHeaderAvatarText: {
      color: 'white',
      fontSize: 18,
   },
   ProfileBtnGroupContainer: {
      padding: 5,
      marginTop: 15,
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'center'
   },
   ProfileBtnGroupWrap: {
      width: '95%',
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 5,
      borderRadius: 5,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 4,
   },
   ProfileBtnPublishedContainer: {
      flex: 1,
      padding: 5,
      alignItems: 'center',
   },
   ProfileBtnPublishedImg: {
      width: 30,
      height: 30,
      marginBottom: 10,
   },
   ProfileLikeContainer: {
      flex: 1,
      padding: 5,
      alignItems: 'center',
   },
   ProfileBtnLikeImg: {
      width: 30,
      height: 30,
      marginBottom: 10,
   },
   ProfileAttentionContainer: {
      flex: 1,
      padding: 5,
      alignItems: 'center',
   },
   ProfileBtnAttentionImg: {
      width: 30,
      height: 30,
      marginBottom: 10,
   },
   ProfileFunctionContainer: {
   },
   ProfileUpdateContainer: {
      backgroundColor: 'white',
      marginBottom: 20,
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10
   },
   ProfileUpdateWrap: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-between',
   },
   ProfileUpdateLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   ProfileUpdateImg: {
      width: 20,
      height: 20,
      marginRight: 10,
   },
   ProfileRightArrow: {
      width: 20,
      height: 20,
   },
   ProfileContactUsContainer: {
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 40,
      alignItems: 'center',
   },
   ProfileContactUsWrap: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-between',
   },
   ProfileContactUsLeft: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   ProfileContactUsImg: {
      width: 24,
      height: 20,
      marginRight: 10,
   },
   BottomContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
   },
   BottomBtnWrap: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.MainRed,
      borderRadius: 25,
      padding: 10,
   },
   BottomBtnText: {
      fontSize: 20,
      color: 'white',
   }

})