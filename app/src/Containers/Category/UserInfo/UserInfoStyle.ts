import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Images} from 'src/Theme';
export default StyleSheet.create({
  ProfileContainer: {
    backgroundColor: '#f4f6f8',
  },
  ProfileHeaderContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    padding: 10,
  },
  ProfileHeaderTitleText: {
    color: '#fff',
    fontSize: 20,
  },
  ProfileHeaderAvatarContainer: {
    padding: 10,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileHeaderAvatarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileHeaderAvatarImg: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  ProfileHeaderAvatarText: {
    color: 'white',
    fontSize: 18,
  },
  ProfileBtnGroupContainer: {
    padding: 5,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileBtnGroupWrap: {
    width: '95%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
    borderRadius: 5,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  HeaderChevronImg: {
    position: 'absolute',
    left: 0,
    padding: 1,
  },
  ProfileFunctionContainer: {
    marginTop: 20,
  },
  ProfileUpdateContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  ProfileUpdateWrap: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  ProfileUpdateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileUpdateImg: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 10,
  },
  ProfileRightArrow: {
    width: 20,
    height: 20,
  },
  ProfileContactUsContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  ProfileContactUsWrap: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  ProfileContactUsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileContactUsImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  ProfileMessageContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  ProfileMessageWrap: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  ProfileMessageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileMessageImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
