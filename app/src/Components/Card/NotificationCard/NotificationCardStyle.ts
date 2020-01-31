import {StyleSheet} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  CardWrap: {
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 5,
  },
  AvatarStyle: {
    width: 45,
    height: 45,
  },
  Userdate: {
    color: Colors.grey,
  },
  CardBtnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardCatName: {
    borderColor: 'blue',
    fontSize: 5,
  },
  CardPriceBtn: {
    // marginTop: 5,
  },
  CardCatBtnWrap: {
    flexDirection: 'row',
  },
  CardDescription: {
    flex: 1,
    marginTop: 8,
    alignItems: 'center',
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
    fontSize: 12,
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
