import {StyleSheet} from 'react-native'
export default StyleSheet.create({
    textBoxContainer: {
      position: 'relative',
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    textBox: {
      height: 40, 
      borderColor: '#ddd', 
      borderBottomWidth: 1, 
    },
    touachableButton: {
      position: 'absolute',
      right: 3,
      height: 30,
      width: 30,
      padding: 2
    },
    buttonImage: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
    }
})