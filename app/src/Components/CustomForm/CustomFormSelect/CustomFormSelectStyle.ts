import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  CustomFormSelectContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    marginRight: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'space-between',
    height:50
  },
  CustomFormSelectTextContainer: {},
  CustomFormSelectPickerContainer: {
    width: '80%',
  },
});
