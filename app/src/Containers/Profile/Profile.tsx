import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';

import Modal, {ModalContent} from 'react-native-modals';

import {Images} from 'src/Theme';
import Style from './ProfileStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {store} from 'src/Store';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';

import QRCode from 'react-native-qrcode-svg';
import call from 'react-native-phone-call';

import {baseUrl, appVersion} from 'src/constants';
const axios = require('axios');
export default function Profile(props) {
  const [state, dispatch] = useContext(store);

  const [photo, setPhoto] = useState({name: '', source: '', data: ''});
  const [name, setName] = useState(state.user.name ? state.user.name : '');
  const nameRef = useRef(null);

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

    setIsServiceModalVisible(true);
  };

  const [isEdit, setIsEdit] = useState(false);
  const handleSignout = async () => {
    props.navigation.navigate('Signin');
  };

  const handlePhoto = () => {
    ImagePicker.showImagePicker(response => {
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
    });
  };

  async function handleSubmit() {
    if (name === '') {
      Toast.show('Input values correctly!');
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
                Toast.show('Success!');
              } else {
                Toast.show('Failed!');
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
      Toast.show('No photo selected');
    }
  }

  useEffect(() => {
    if (!state.auth_token) props.navigation.navigate('Signin');
    if (nameRef?.current) nameRef.current.value = state.user.name;

    (async () => {
      await axios
        .post(baseUrl + 'api/profile/last')
        .then(function(response) {
          if (response.data.item) {
            console.log(response.data);

            let {version, share, about, service, phone} = response.data.item;

            let versionDescription = '';
            if (appVersion === version) {
              versionDescription =
                'Your app is the latest version(' + version + ').';
            } else {
              versionDescription =
                'Your app is the old version(' +
                appVersion +
                ').Lastest version is ' +
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
          <View style={Style.ProfileHeaderAvatarWrap}>
            <TouchableOpacity
              style={Style.HeaderImgContainer}
              onPress={handlePhoto}>
              {state.user && state.user.photo && (
                <Image
                  source={{
                    uri: baseUrl + 'download/photo?path=' + state.user.photo,
                  }}
                  style={Style.ProfileHeaderAvatarImg}
                />
              )}
              {state.user && (!state.user.photo || state.user.photo === '') && (
                <Image
                  source={photo.source ? photo.source : Images.femaleProfile}
                  style={Style.ProfileHeaderAvatarImg}
                />
              )}

              <Image source={Images.Camera} style={Style.HeaderImgBadge} />
            </TouchableOpacity>
            <View>
              <Text style={Style.ProfileHeaderAvatarText}>气候品牌亮相</Text>
              <Text style={{color: Colors.white, fontSize: 12}}>
                {state.user.name}
              </Text>
              <Text style={{color: Colors.white, fontSize: 12}}>
                {state.user.phone}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (nameRef?.current) nameRef.current.focus();
                setIsEdit(!isEdit);
              }}>
              <Image source={Images.TextEdit} style={Style.HeaderTextBadge} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {isEdit && (
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TextInput
                style={{backgroundColor: 'white', width: '60%'}}
                onChangeText={value => setName(value)}
                ref={nameRef}
              />
              <TouchableOpacity onPress={handleSubmit} style={{width: '40%'}}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          )}
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
              call({
                number: profile.phone,
                prompt: false,
              }).catch(console.error);
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
                style={Style.ProfileContactUsImg}
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
                style={Style.ProfileContactUsImg}
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
        }}>
        <ModalContent>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80%',
              width: '90%',
            }}>
            <ScrollView>
              {current === 'share' && <QRCode value={profile.share} />}
              <Text>{service}</Text>
            </ScrollView>
          </View>
        </ModalContent>
        <Button
          title="Close"
          onPress={() => {
            setIsServiceModalVisible(false);
          }}
        />
      </Modal>
    </ScrollView>
  );
}
