import {StyleSheet, Dimensions} from 'react-native'
import { Colors } from 'src/Theme'


export default StyleSheet.create({
   CustomFormSelectContainer: {
      flexDirection: 'row',
      paddingLeft: 5,
      borderBottomWidth: 0.3,
      borderBottomColor: Colors.grey,
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   CustomFormSelectTextContainer: {
   },
   CustomFormSelectPickerContainer: {
      width: '80%'
   }
})