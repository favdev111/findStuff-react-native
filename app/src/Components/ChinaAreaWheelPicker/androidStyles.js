import {StyleSheet, Platform, Dimensions} from 'react-native';
const WINDOW = Dimensions.get('window');
const SCREEN_WIDTH = WINDOW.width;
const SCREEN_HEIGHT = WINDOW.height;
const OS = Platform.OS;

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  container: {
    position: 'absolute',
    top: OS === 'ios' ? 44 : 48,
    left: 50,
    width: SCREEN_WIDTH - 100,
    height: SCREEN_HEIGHT - 100,
    paddingTop: 58,
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    height: 58,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#000',
    textAlignVertical: 'center',
  },
  list: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: 14,
    fontSize: 20,
    height: 58,
    textAlignVertical: 'center',
    color: '#333',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebebeb',
  },
});

export default styles;
