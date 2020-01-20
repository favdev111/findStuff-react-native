import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Images} from 'src/Theme';
export default StyleSheet.create({
  FindStuffHeaderContainer: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#0084da',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  FindStuffHeaderImg: {
    height: 40,
    width: 40,
    transform: [{rotate: '90deg'}],
  },
  UserInfoContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  AvatarPhoto: {
    width: 35,
    height: 35,
  },
  AvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  AvatarPhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  PickBtn: {
    backgroundColor: '#0084da',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  UserNameContainer: {
    marginLeft: 10,
  },
  UserNameBtn: {
    paddingLeft: 3,
    paddingRight: 3,
    padding: 1,
    borderRadius: 7,
    backgroundColor: Colors.MainYellow,
  },
  UserLocationImg: {
    width: 17,
    height: 17,
  },
  UserLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ContactBtn: {
    backgroundColor: Colors.MainYellow,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    padding: 2,
  },
  UserLocaionWrap: {
    flexDirection: 'row',
  },
  StuffInfoContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  StuffImgContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  StuffImg: {
    width: '45%',
    height: 100,
    margin: 5,
  },
  StuffReportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CommentContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
  },
  AvatarImg: {
    width: 35,
    height: 35,
  },
  CommentAvatarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  CommentDescriptionContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
  UserDescriptionContainer: {
    padding: 5,
  },
  CommentReplyContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
  },
  OtherDescriptionContainer: {
    padding: 5,
    backgroundColor: '#f4f6f8',
  },
  CommentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f4f6f8',
  },
  InputImgContainer: {
    flexDirection: 'row',
  },
  CommentInputWrap: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  LikeCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputImg: {
    width: 35,
    height: 35,
  },
  InputContainer: {
    width: '70%',
  },
});
