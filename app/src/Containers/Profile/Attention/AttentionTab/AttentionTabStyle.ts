import {StyleSheet} from 'react-native'
import {Colors} from 'src/Theme'

export default StyleSheet.create({
   AttentionContainer: {
      padding: 5
   },
   AttentionListWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.3,
      padding: 5,
      borderBottomColor: Colors.grey,
      backgroundColor: '#fff',
   },
   AttentionListImgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   AttentionListTextContainer: {
      marginLeft: 5,
   },
   AttentionListBtn: {
      width: 72,
      height: 22,
   },
   sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 20,
      fontWeight: 'bold',
   }
})
