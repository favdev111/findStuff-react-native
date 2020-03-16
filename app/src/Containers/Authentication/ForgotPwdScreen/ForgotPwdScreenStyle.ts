import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  SignUpHeader: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#0084da',
    alignItems: 'center',
    flexDirection: 'row',
  },
  SignUpHeaderImg: {
    height: 35,
    width: 35,
    transform: [{rotate: '90deg'}],
  },
  SignFormContainer: {
    padding: 30,
  },
  FormInput: {
    paddingTop: 15,
  },

  SignBtn: {
    alignItems: 'center',
    marginTop: 50,
  },
});
