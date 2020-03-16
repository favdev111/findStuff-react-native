import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  FindStuffHeaderContainer: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'android' ? 40 : 55,
    backgroundColor: '#0084da',
    alignItems: 'flex-end',
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FindStuffHeaderImg: {
    height: 30,
    width: 30,
    transform: [{rotate: '90deg'}],
  },
});
