import {StyleSheet,Dimensions} from 'react-native'
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
      height: 35,
      width: 35,
      transform: [{ rotate: '90deg' }],
   },
   HeaderRightImgContainer: {
   },
   HeaderRightImg: {
      width: 30,
      height: 30,
   },
   CategoryListContainer: {

   },
   CategoryListHeader: {
      height: 50,
      backgroundColor: '#0084da',
      alignItems: 'center',
      justifyContent: 'center',
   },
   CategoryListWrap: {
      padding: 5,
      paddingTop: 15,
      backgroundColor: '#fff',
   },
   CategoryFlatList: {
      flexDirection: 'column',
   },
   CardsContainer: {
      marginTop: 10,
      backgroundColor: '#fff',
   }
})