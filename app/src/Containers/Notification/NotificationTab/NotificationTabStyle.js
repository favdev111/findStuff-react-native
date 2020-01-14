import {StyleSheet} from 'react-native'
import {Colors} from 'src/Theme'

export default StyleSheet.create({
   NewsContainer: {
      backgroundColor: '#fff',
      marginTop: 10,
      padding: 10,
   },
   RaisedContainer: {
      borderBottomWidth: 0.3,
      borderBottomColor: Colors.grey,
      paddingBottom: 10,
   },
   RaisedWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   RaiseLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   SystemWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      
   },
   SystemContainer: {
      marginTop: 10,
   },
   NewsListContainer: {
      backgroundColor: '#fff',
      marginTop: 10,
   },
   NewsListHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
   }
})
