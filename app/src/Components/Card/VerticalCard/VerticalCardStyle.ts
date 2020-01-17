import {StyleSheet} from 'react-native'
import {Colors} from 'src/Theme'

export default StyleSheet.create({
   VerticalCardWrap: {
      flex: 1,
      borderRadius: 10,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      height: '100%',
      padding: 1,
   },
   ImageContainer: {
      width: '100%',
      height: '65%',
   },
   ImageImg: {
      width: '100%',
      height: '100%',
   },
   InfoContainer: {
      padding: 5,
   },
   BadgeContainer: {
      marginTop: 3,
      flexDirection: 'row-reverse'
   },
   AvatarContainer: {
      marginTop: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
   },
   nameContainer:{
      alignItems: 'center',
      justifyContent: 'center'
   },
   PhotoImg: {
      width: 25,
      height: 25,
   },
   DescriptionText: {
      color: Colors.grey,
      fontSize: 12,
   },
   BadgeImg: {
      width: 50,
      height: 15,
   },
   ChatContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   LikeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   LikeImg: {
      width: 16,
      height: 16,
   }
})