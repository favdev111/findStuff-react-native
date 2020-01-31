import {StyleSheet} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  CardWrap: {
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
