import {StyleSheet} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  CardWrap: {
    flex: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: '#ddd',
    marginTop: 20,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  CardInfoWrap: {
    flexDirection: 'row',
  },
  ImageSection: {
    paddingRight: 10,
  },
  AvatarStyle: {
    width: 45,
    height: 45,
  },
  UserName: {},
  Userdate: {
    color: Colors.grey,
  },
  CardBtnGroup: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardCatName: {
    borderColor: 'blue',
    fontSize: 5,
  },
  CardPriceBtn: {
    marginTop: 5,
  },
  CardCatBtnWrap: {
    flexDirection: 'row',
  },
  CardDesAndImgContainer: {
    flexDirection: 'row',
  },
  CardDescription: {
    flex: 1,
    marginTop: 8,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  CardImageSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  CardImage: {
    width: 80,
    height: 60,
  },
  CardDescriptionText: {
    color: Colors.grey,
  },
  CardLocation: {
    flexDirection: 'row',
    flex: 1,
  },
  CardLocationImg: {
    width: 17,
    height: 17,
  },
  CardLocationText: {
    color: Colors.grey,
  },
  CardLocationGroup: {
    paddingLeft: 15,
    flexDirection: 'row',
  },
  CardLocationChat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  CardLocationChatImg: {
    width: 20,
    height: 20,
  },
  CardLocationChatText: {
    fontSize: 15,
    color: Colors.grey,
  },
});
