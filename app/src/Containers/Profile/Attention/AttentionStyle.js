import {StyleSheet,Dimensions} from 'react-native'
export default StyleSheet.create({
   FindStuffHeaderContainer: {
      width: Dimensions.get('window').width,
      height: 50,
      backgroundColor: '#0084da',
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 5,
      paddingRight: 5,
      justifyContent: 'space-between',
   },
   FindStuffHeaderImg: {
      height: 35,
      width: 35,
      transform: [{ rotate: '90deg' }],
   },
})