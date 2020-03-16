import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'src/Theme';
export default StyleSheet.create({
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
    borderRadius: 50,
  },
  AvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  AvatarPhotoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  FeeBtn: {
    backgroundColor: '#ff0000',
    borderRadius: 50,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  FeeBtn2: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  FeeBtn3: {
    backgroundColor: '#ff0000',
    borderRadius: 36,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  PickBtn: {
    backgroundColor: '#0084da',
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LostBtn: {
    backgroundColor: Colors.MainYellow, //'#ff9800',
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserNameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  UserNameContainer: {
    flex: 7,
    marginLeft: 10,
    flexDirection: 'column',
  },
  UserNameBtn: {
    borderRadius: 7,
    backgroundColor: Colors.MainYellow,
  },
  UserLocationImg: {
    width: 17,
    height: 17,
  },
  UserLocationContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  ContactBtn: {
    backgroundColor: Colors.MainYellow,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    width: '80%',
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
