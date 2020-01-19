import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
   GetStuffScreenContainer: {
      backgroundColor: '#f4f6f8',
    },
    FindStuffHeaderContainer: {
      width: Dimensions.get('window').width,
      height: 50,
      backgroundColor: '#0084da',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    MessageListContainer: {
      padding: 5,
    },
    MessageListAvatar: {
       width: 35,
       height: 35,
    },
    MessageListImgWrap: {
        marginRight: 10,
    },
    AvatarBadgeContainer:{
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: Colors.MainRed,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 20,
    },
    MessageListWrap: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       paddingTop: 15,
       paddingBottom: 15,
       padding: 5,
       borderBottomWidth: 0.3,
       borderBottomColor: '#ddd',
    },
    MessageListAvatarWrap: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
    }
});
