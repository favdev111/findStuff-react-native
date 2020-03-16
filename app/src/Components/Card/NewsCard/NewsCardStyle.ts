import {StyleSheet} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  CardWrap: {
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  CardDescription: {
    marginTop: 8,
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
  CardLocationImg: {
    width: 17,
    height: 17,
  },
  CardLocationText: {
    color: Colors.grey,
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
