
import {StyleSheet, Dimensions} from 'react-native'


export default StyleSheet.create({
   FindStuffScreenContainer: {
      backgroundColor: '#f4f6f8',
      // backgroundColor: 'white',
   },
   FindStuffHeaderContainer: {
      width: Dimensions.get('window').width,
      height: 50,
      backgroundColor: '#0084da',
      alignItems: 'center',
      flexDirection: 'row',
   },
   FindStuffHeaderImg: {
      height: 35,
      width: 35,
      transform: [{ rotate: '90deg' }],
   },
   StuffInfoContainer: {
      backgroundColor: '#fff',
      marginTop: 10,
      paddingLeft: 10,
   },
})