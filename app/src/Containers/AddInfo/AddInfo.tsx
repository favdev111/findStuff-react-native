import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {withNavigation} from 'react-navigation';
import {Images} from 'src/Theme';
import Styles from './AddInfoStyle';
import {NavigationEvents} from 'react-navigation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

function AddInfo(props) {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const gotoLostStuffScreen = () => {
    setIsModalVisible(false);
    props.navigation.navigate('LostStuffScreen');
  };
  const gotoFoundStuffScreen = () => {
    setIsModalVisible(false);
    props.navigation.navigate('FoundStuffScreen');
  };
  const gotoHomeScreen = () => {
    setIsModalVisible(false);
    props.navigation.navigate('AppHome');
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      setIsModalVisible(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('current visible state is...', isModalVisible);
  }, [isModalVisible]);

  return (
    <View style={{flex: 1}}>
      <NavigationEvents
        onDidFocus={() => {
          setIsModalVisible(true);
        }}
      />
      <Modal
        style={Styles.AddInfoModalContainer}
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        hideModalContentWhileAnimating={true}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.7}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flex: 1}}>
            <View style={Styles.AddInfoHeader}>
              <Text style={{color: '#fff', fontSize: 20}}>发布</Text>
            </View>
            <View style={Styles.AddInfoBannerContainer}>
              <ImageBackground
                source={Images.AddInfoBanner}
                style={Styles.AddInfoBannerImg}
              />
            </View>
          </View>
          <View style={Styles.AddInfoBtnContainer}>
            <View style={Styles.AddBtnWrap}>
              <View>
                <TouchableOpacity onPress={() => gotoLostStuffScreen()}>
                  <FastImage
                    style={Styles.FindBtnImg}
                    source={Images.HomeFindBtn}
                  />
                  <Text>寻物启事</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => gotoFoundStuffScreen()}>
                  <FastImage
                    style={Styles.GetBtnImg}
                    source={Images.HomeGetBtn}
                  />
                  <Text>失物招领</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.CloseBtnWrap}>
              <TouchableOpacity onPress={() => gotoHomeScreen()}>
                <FastImage style={Styles.CloseImg} source={Images.CloseIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default withNavigation(AddInfo);
