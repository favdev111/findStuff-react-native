import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  FindStuffHeaderContainer: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#0084da',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  FindStuffHeaderImg: {
    height: 35,
    width: 35,
    transform: [{rotate: '90deg'}],
  },
  HeaderRightImg: {
    width: 30,
    height: 30,
  },
  CategoryListContainer: {flex: 1},
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
  },
  ///////////////////////////
  HomeSearchArea: {
    //  position: 'absolute',
    backgroundColor: '#fff',
    //  top: -15,
    flexDirection: 'row',
    width: '100%',
    height: 45,
    borderRadius: 4,
    padding: 10,
  },
  HomeSearchImg: {
    width: 26,
    height: 26,
    marginLeft: 20,
  },
  HomeSearchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  HomeSearchInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  HomeSearchInput: {
    height: 40,
  },
});
