import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width,
    flex: 1,
  },
  carouselDot: {
    backgroundColor: 'rgba(255,255,255,.7)',
    width: 15,
    height: 3,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 3,
    marginBottom: 3,
  },
  carouselActiveDot: {
    backgroundColor: '#fff',
    width: 15,
    height: 3,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 3,
    marginBottom: 3,
  },
});
