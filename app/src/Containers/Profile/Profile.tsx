import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Modal, {ModalContent} from 'react-native-modals';

import {Images} from 'src/Theme';
import Style from './ProfileStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {store} from 'src/Store';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';

import QRCode from 'react-native-qrcode-svg';

import {baseUrl, appVersion} from 'src/constants';
import axios from 'axios';
import withAuth from 'src/withAuth';

const Profile = props => {
  const [state, dispatch] = useContext(store);

  const [photo, setPhoto] = useState({name: '', source: '', data: ''});
  const [name, setName] = useState(state.user.name ? state.user.name : '');

  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const [service, setService] = useState('aaaaaaaa');
  const [current, setCurrent] = useState('');

  const [profile, setProfile] = useState({
    version: appVersion,
    service: 'OurCompany....',
    share: 'https:///',
    about: 'We are the whole...',
    phone: '11111',
  });

  const handleModal = idx => {
    setCurrent(idx);
    if (idx === 'service') setService(profile.service);
    else if (idx === 'about') setService(profile.about);
    else if (idx === 'share') setService(profile.share);
    else if (idx === 'upgrade') setService(profile.version);
    else if (idx === 'phone') setService(profile.phone);

    setIsServiceModalVisible(true);
  };

  const [isEdit, setIsEdit] = useState(false);
  const handleSignout = async () => {
    dispatch({type: 'setState', payload: {user: {}, token: ''}});
    AsyncStorage.clear();
    props.navigation.navigate('Home');
  };

  const handlePhoto = () => {
    ImagePicker.showImagePicker(
      {
        title: '选择一张照片',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '从照片中选择',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const name = response.uri;
          const source = {uri: response.uri};
          const data = 'data:image/jpeg;base64,' + response.data;

          setPhoto({source, data, name});
        }
      },
    );
  };

  async function handleSubmit() {
    if (name === '') {
      Toast.show('正确输入值！');
      return;
    }
    if (photo) {
      let formData = new FormData();

      const file = {
        uri: photo.name,
        name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
        type: photo.mime || 'image/jpeg',
      };
      formData.append('file', file);

      await axios
        .post(baseUrl + 'upload/file', formData)
        .then(response => {
          axios
            .put(
              baseUrl + 'api2/user/' + state.user._id,
              {
                photo: response.data.file.path,
                name,
              },
              {
                headers: {auth_token: state.auth_token},
              },
            )
            .then(function(response2) {
              console.log('response2', response2.data);
              if (response2.data.success) {
                dispatch({type: 'setUser', payload: response2.data.user});
                Toast.show('成功!');
              } else {
                Toast.show('失败了!');
              }
            })
            .catch(function(error) {
              console.log('eeeeeerrrrrrrrr', error);
              // Toast.show(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Toast.show('未选择照片!');
    }
  }

  useEffect(() => {
    (async () => {
      await axios
        .post(baseUrl + 'api/profile/last')
        .then(function(response) {
          if (response.data.item) {
            console.log(response.data);

            let {version, share, about, service, phone} = response.data.item;

            let versionDescription = '';
            if (appVersion === version) {
              versionDescription = '您的应用是最新版本(' + version + ').';
            } else {
              versionDescription =
                '您的应用是旧版本(' +
                appVersion +
                ').最新版本是' +
                version +
                '.';
            }

            setProfile({
              version: versionDescription,
              share,
              about,
              service,
              phone,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
    })();
  }, []);

  return (
    <ScrollView style={Style.ProfileContainer}>
      <ImageBackground
        source={Images.ProfileBannerImg}
        style={Style.ProfileHeaderContainer}>
        <View style={Style.ProfileHeaderTitleContainer}>
          <Text style={Style.ProfileHeaderTitleText}>我的</Text>
        </View>
        <View style={Style.ProfileHeaderAvatarContainer}>
          <TouchableOpacity onPress={handlePhoto} style={{marginRight: 15}}>
            {state.user.photo !== '' && (
              <Image
                source={{
                  uri: baseUrl + 'download/photo?path=' + state.user.photo,
                }}
                style={Style.ProfileHeaderAvatarImg}
                resizeMode="cover"
                borderRadius={30}
              />
            )}
            {state.user.photo === '' && (
              <Image
                source={photo.source ? photo.source : Images.femaleProfile}
                style={Style.ProfileHeaderAvatarImg}
                resizeMode="cover"
                borderRadius={30}
              />
            )}
            <Image source={Images.Camera} style={Style.HeaderImgBadge} />
          </TouchableOpacity>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={Style.ProfileHeaderAvatarText}>气候品牌亮相</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsEdit(!isEdit);
                }}>
                <Image source={Images.TextEdit} style={Style.HeaderTextBadge} />
              </TouchableOpacity>
            </View>
            <Text style={{color: Colors.white, fontSize: 12}}>
              {state.user.name}
            </Text>
            <Text style={{color: Colors.white, fontSize: 12}}>
              {state.user.phone}
            </Text>

            {isEdit && (
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    width: '50%',
                    padding: 0,
                  }}
                  onChangeText={value => setName(value)}
                />
                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={{
                      color: 'white',
                      marginTop: 3,
                    }}>
                    保存
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
      <View style={Style.ProfileBtnGroupContainer}>
        <View style={Style.ProfileBtnGroupWrap}>
          <TouchableOpacity
            style={Style.ProfileBtnPublishedContainer}
            onPress={() => {
              handleModal('service');
            }}>
            <Image
              source={Images.ProfileBtnPublished}
              style={Style.ProfileBtnPublishedImg}
            />
            <Text>服务</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.ProfileLikeContainer}
            onPress={() => {
              handleModal('phone');
            }}>
            <Image
              source={Images.ProfileBtnLike}
              style={Style.ProfileBtnLikeImg}
            />
            <Text>联系我们</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Style.ProfileFunctionContainer}>
        <TouchableOpacity
          style={Style.ProfileUpdateContainer}
          onPress={() => {
            handleModal('upgrade');
          }}>
          <View style={Style.ProfileUpdateWrap}>
            <View style={Style.ProfileUpdateLeft}>
              <Image
                source={Images.ProfileUpdate}
                style={Style.ProfileUpdateImg}
              />
              <Text>检查更新</Text>
            </View>
            <View>
              <Image
                source={Images.RightArrow}
                style={Style.ProfileRightArrow}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.ProfileContactUsContainer}
          onPress={() => {
            handleModal('about');
          }}>
          <View style={Style.ProfileContactUsWrap}>
            <View style={Style.ProfileContactUsLeft}>
              <Image
                source={Images.ProfileContactus}
                style={Style.ProfileContactImg}
              />
              <Text>关于寻N</Text>
            </View>
            <View>
              <Image
                source={Images.RightArrow}
                style={Style.ProfileRightArrow}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.ProfileIntroContainer}
          onPress={() => {
            handleModal('share');
          }}>
          <View style={Style.ProfileContactUsWrap}>
            <View style={Style.ProfileContactUsLeft}>
              <Image
                source={Images.ProfileWithFriend}
                style={Style.ProfileShareImg}
              />
              <Text>分享给朋友</Text>
            </View>
            <View>
              <Image
                source={Images.RightArrow}
                style={Style.ProfileRightArrow}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={Style.BottomContainer} onPress={handleSignout}>
        <View style={Style.BottomBtnWrap}>
          <Text style={Style.BottomBtnText}>安全退出</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isServiceModalVisible}
        onTouchOutside={() => {
          setIsServiceModalVisible(false);
        }}
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ModalContent
          style={{
            width: Dimensions.get('window').width * 0.8,
            height: '80%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              {current === 'share' && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <QRCode value={profile.share} size={200} />
                </View>
              )}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <Text>{service}</Text>
              </View>
            </View>
          </View>
        </ModalContent>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{flex: 1}}></View>
          <Button
            title="      关闭      "
            onPress={() => {
              setIsServiceModalVisible(false);
            }}
          />
          <View style={{flex: 1}}></View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default withAuth(Profile);
