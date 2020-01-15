import {StyleSheet, Dimensions} from 'react-native';
const WINDOW = Dimensions.get('window');
const SCREEN_WIDTH = WINDOW.width;
const SCREEN_HEIGHT = WINDOW.height;

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  pickerContainer: {
    flex: 1,
    position: 'absolute',
    height: 250,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  pickerNavWrap: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  btn: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#4d90fe',
    fontSize: 16,
  },
  pickerWrap: {
    flexDirection: 'row',
  },
  pickerItem: {
    flex: 1,
  },
});

export default styles;
