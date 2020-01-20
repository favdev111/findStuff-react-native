import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {withNavigation} from 'react-navigation';
import {Images} from 'src/Theme';
import Styles from './AddInfoStyle';

class AddInfo extends Component {
  public props: any;
  public focusListener: any;
  public setState: any;
  public navigation: any;
  state = {
    isModalVisible: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.toggleModal();
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  gotoSignIn = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('Signin');
  };
  gotoLostStuffScreen = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('LostStuffScreen');
  };
  gotoFoundStuffScreen = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('FoundStuffScreen');
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          style={Styles.AddInfoModalContainer}
          isVisible={this.state.isModalVisible}
          backdropColor={'#fff'}
          backdropOpacity={0.9}>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={Styles.AddInfoHeader}>
                <Text style={{color: '#ffffff', fontSize: 20}}>发布</Text>
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
                  <TouchableOpacity onPress={() => this.gotoLostStuffScreen()}>
                    <Image
                      style={Styles.FindBtnImg}
                      source={Images.HomeFindBtn}
                    />
                    <Text>寻物启事</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.gotoFoundStuffScreen()}>
                    <Image
                      style={Styles.GetBtnImg}
                      source={Images.HomeGetBtn}
                    />
                    <Text>失物招领</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Styles.CloseBtnWrap}>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal();
                    this.props.navigation.navigate('Home');
                  }}>
                  <Image style={Styles.CloseImg} source={Images.CloseIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default withNavigation(AddInfo);
