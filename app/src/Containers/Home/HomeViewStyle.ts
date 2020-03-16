import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'src/Theme';
export default StyleSheet.create({
  scene: {
    flex: 1,
  },
  homeScrollView: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  HomeBannerContainer: {
    flex: 1,
  },
  HomeBannerImg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.5,
  },
  HomeBannerMsg: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 40,
    height: 40,
  },
  HomeSearchArea: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -20,
    flexDirection: 'row',
    width: '85%',
    height: 45,
    borderRadius: 4,
  },
  HomeSearchImg: {
    width: 20,
    height: 20,
  },
  HomeSearchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  HomeSearchInputContainer: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  HomeSearchInput: {
    height: 40,
  },

  HomeSearchBtn: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderLeftWidth: 0,
    padding: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 45,
  },
  HomeMainBtnGroup: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 40,
    marginBottom: 2,
    flex: 1,
  },
  HomeCategoryContainer: {
    marginTop: 10,
    padding: 10,
    paddingTop: 5,
    backgroundColor: 'white',
  },
  HomeNotificationArea: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  HomeNotificationText: {
    flex: 1,
    color: Colors.grey,
    marginLeft: 5,
    padding: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  wrapDropDownHeader: {
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
