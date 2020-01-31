import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'src/Theme';

export default StyleSheet.create({
  FindStuffScreenContainer: {
    backgroundColor: '#f4f6f8',
  },
  FindStuffHeaderContainer: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#0084da',
    alignItems: 'center',
    flexDirection: 'row',
  },
  FindStuffHeaderImg: {
    height: 35,
    width: 35,
    transform: [{rotate: '90deg'}],
  },
  StuffInfoContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 10,
  },
  FindStuffAreaContainer: {
    padding: 5,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
  },
  FindStuffAreaTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  FindStuffAreaText: {
    color: Colors.grey,
  },
  FindStuffDetailAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  FindStuffDetailAreaInput: {
    height: 40,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.paleGrey3,
  },
  FindStuffDetailAreaBtn: {
    color: '#0084da',
    marginRight: 5,
  },
  FindStuffPriceBtnContainer: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  FindStuffPriceInput: {
    height: 40,
    flex: 1,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.paleGrey3,
    marginRight: 12,
    marginLeft: 5,
  },
  FindStuffFooter: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  FindStuffTextArea: {
    borderColor: Colors.grey,
    marginTop: 5,
    borderWidth: 0.3,
    textAlignVertical: 'top',
  },
  FindStuffImgUploadContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  FindStuffImgUploadWrap: {
    borderWidth: 0.3,
    borderColor: Colors.grey,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  FindStuffImgUpload: {
    width: 30,
    height: 30,
  },
  FindStuffImgGroupContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  FindStuffSubBtnContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FindStuffSubBtn: {
    width: '85%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0084da',
    paddingTop: 10,
    paddingBottom: 10,
  },
  FindStuffSubBtnText: {
    color: '#fff',
    fontSize: 18,
  },
});
