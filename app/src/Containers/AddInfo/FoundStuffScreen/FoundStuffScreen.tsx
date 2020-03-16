import React, {useState, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './FoundStuffScreenStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect';
import {Images, Colors} from 'src/Theme';
import ChinaRegionWheelPicker from 'src/Lib/rn-wheel-picker-china-region';

import {store} from 'src/Store';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
import {baseUrl, photoSize} from 'src/config';

import {RESULTS} from 'react-native-permissions';
import {checkCamLibPermission} from 'src/Permissions';

const FoundStuffScreen = props => {
  const [state, dispatch] = useContext(store);
  const [tag, setTag] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState([]);

  const handlePhoto = async () => {
    console.log(photo.length, '***********************');

    if (photo.length > 5) {
      Toast.show('您选择的图像不能超过6张。');
      return;
    }

    if (Platform.OS === 'android') {
      const ret = await checkCamLibPermission();
      console.log('111111111111111', ret);
      if (!ret) return;
    }

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
          ImageResizer.createResizedImage(
            response.uri,
            photoSize,
            photoSize,
            'JPEG',
            100,
            0,
          )
            .then(({uri, path, name, size}) => {
              console.log('uri', uri, 'path', path, 'name', name, 'size', size);
              setPhoto([...photo, {uri, name, type: 'image/jpeg'}]);
              if (photo.length > 4) Toast.show('您选择所有最多6张图像');
            })
            .catch(err => {
              console.log('resize error... ... ...', err);
            });
        }
      },
    );
  };

  async function handleSubmit() {
    if (tag === '' || place === '' || address === '' || description === '') {
      Toast.show('正确输入值!');
      return;
    }

    if (photo && photo.length > 0) {
      let formData = new FormData();
      photo.forEach(ph => {
        formData.append('photo', ph);
      });

      console.log('name or phone', state.user.name || state.user.phone);

      await axios
        .post(baseUrl + 'upload/photo', formData)
        .then(response => {
          const photos = response.data.photo;
          axios
            .post(baseUrl + 'api/stuffpost', {
              kind: 'found',
              tag,
              place,
              address,
              description,
              photos,
              fee: 0,
              phone,
              user: state.user._id,
              title: state.user.name || state.user.phone,
            })
            .then(function(response2) {
              Toast.show(response2.data.msg);
              if (response2.data.success) {
                props.navigation.navigate('AppHome');
              }
            })
            .catch(function(error) {
              Toast.show('错误');
            });
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    } else {
      axios
        .post(baseUrl + 'api/stuffpost', {
          kind: 'found',
          tag,
          place,
          address,
          description,
          photos: [],
          fee: 0,
          phone,
          user: state.user._id,
          title: state.user.name,
        })
        .then(function(response2) {
          Toast.show(response2.data.msg);
          if (response2.data.success) {
            props.navigation.navigate('AppHome');
          }
        })
        .catch(function(error) {
          Toast.show('错误');
        });
    }
  }

  return (
    <ScrollView style={Styles.GetStuffScreenContainer}>
      <NavigationEvents
        onDidFocus={() => {
          if (!state.user._id) props.navigation.navigate('Signin');
          dispatch({type: 'setCurrentScreen', payload: 'found-screen'});
        }}
      />

      <Header
        back={() => props.navigation.navigate('AppHome')}
        label={'详细情况'}
      />

      <View style={Styles.StuffInfoContainer}>
        <CustomFormSelect
          CustomFormSelectLabel={'物品类型'}
          CustomFormSelectPlaceholder={'请选择类型'}
          procFunc={value => setTag(value)}
        />

        <View style={Styles.FindStuffAreaContainer}>
          <View>
            <Text>选择地点</Text>
          </View>
          <View style={{flex: 1}}>
            <ChinaRegionWheelPicker
              onSubmit={params =>
                setPlace(`${params.province},${params.city},${params.area}`)
              }
              onCancel={() => console.log('cancel')}>
              <Text
                style={{
                  paddingVertical: 10,
                  textAlign: 'center',
                  color: 'black',
                }}>
                {place || '点击去选择地区'}
              </Text>
            </ChinaRegionWheelPicker>
          </View>
        </View>
        <View style={Styles.FindStuffDetailAreaContainer}>
          <View>
            <Text>详细地址</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput
              style={Styles.FindStuffDetailAreaInput}
              onChangeText={value => setAddress(value)}
            />
          </View>
        </View>
        <View style={Styles.FindStuffDetailAreaContainer}>
          <View>
            <Text>联系电话</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput
              style={Styles.FindStuffDetailAreaInput}
              onChangeText={value => setPhone(value)}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </View>

      <View style={Styles.FindStuffFooter}>
        <View>
          <Text>物品描述</Text>
          <TextInput
            style={Styles.FindStuffTextArea}
            multiline={true}
            numberOfLines={4}
            onChangeText={value => setDescription(value)}
          />
        </View>
        <View style={Styles.FindStuffImgUploadContainer}>
          <TouchableOpacity
            style={Styles.FindStuffImgUploadWrap}
            onPress={handlePhoto}>
            <FastImage
              source={Images.Camera}
              style={Styles.FindStuffImgUpload}
            />
            <Text style={{color: Colors.grey}}>添加图片</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.FindStuffImgGroupContainer}>
          {photo &&
            photo.map((ph, i) => (
              <View style={{}}>
                <FastImage
                  key={i}
                  source={ph}
                  style={{
                    width: 70,
                    height: 70,
                    marginBottom: -15,
                    marginTop: 5,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setPhoto(photo.filter(p => p.uri != ph.uri));
                  }}
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: Colors.warmBlue,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>{'×'}</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
      <View style={Styles.FindStuffSubBtnContainer}>
        <TouchableOpacity style={Styles.FindStuffSubBtn} onPress={handleSubmit}>
          <Text style={Styles.FindStuffSubBtnText}>确认发布</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FoundStuffScreen;
