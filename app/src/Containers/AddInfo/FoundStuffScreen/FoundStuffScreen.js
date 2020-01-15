import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Styles from './FoundStuffScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect';
import {Images, Colors} from 'src/Theme';
import ChinaRegionWheelPicker from 'src/Lib/rn-wheel-picker-china-region';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
const axios = require('axios');

let data = [];
for (var i = 0; i < 100; i++) {
  data.push(i);
}

export default function FoundStuffScreen(props) {
  const [tag, setTag] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoSrc, setPhotoSrc] = useState({});

  const handlePhoto = () => {
    ImagePicker.showImagePicker(response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const sourceData = 'data:image/jpeg;base64,' + response.data;

        setPhotoSrc(source);
        setPhoto(sourceData);
      }
    });
  };

  const handleUpload = () => {
    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2:8000/upload',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      {name: 'avatar', filename: 'avatar.png', data: photo},
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleSubmit = () => {
    if (tag === '' || place === '' || address === '' || description === '') {
      Toast.show('Input values correctly!');
      return;
    }

    axios
      .post('http://10.0.2.2:8000/api/foundpost', {
        tag,
        place,
        address,
        description,
        photo,
      })
      .then(function(response) {
        if (response.data) Toast.show('Success!');
        else Toast.show('Failed!');
      })
      .catch(function(error) {
        Toast.show(error);
      });
  };

  return (
    <ScrollView style={Styles.GetStuffScreenContainer}>
      <View style={Styles.FindStuffHeaderContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MainScreenWithBottomNav')}
          style={{flex: 1}}>
          <Image
            source={Images.whiteLeftChevron}
            style={Styles.FindStuffHeaderImg}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 25, color: '#fff', flex: 1}}>详细情况</Text>
        <Text style={{flex: 1}} />
      </View>
      <View style={Styles.StuffInfoContainer}>
        <CustomFormSelect
          CustomFormSelectLabel={'物品类型'}
          CustomFormSelectPlaceholder={'请选择类型'}
          procFunc={value => setTag(value)}
        />

        <View style={Styles.FindStuffAreaContainer}>
          <View style={Styles.FindStuffAreaLabelContainer}>
            <Text style={Styles.FindStuffAreaLabel}>选择地点</Text>
          </View>

          <ChinaRegionWheelPicker
            onSubmit={params =>
              setPlace(`${params.province},${params.city},${params.area}`)
            }
            onCancel={() => console.log('cancel')}>
            <Text
              style={{
                backgroundColor: '#FFF',
                width: 200,
                paddingVertical: 20,
                textAlign: 'center',
                color: 'black',
              }}>
              {place || '点击去选择地区'}
            </Text>
          </ChinaRegionWheelPicker>
        </View>
        <View style={Styles.FindStuffDetailAreaContainer}>
          <View style={Styles.FindStuffDetailAreaTextContainer}>
            <Text style={Styles.FindStuffDetailAreaText}>详细地址</Text>
          </View>
          <View style={Styles.FindStuffDetailAreaInputContainer}>
            <TextInput
              style={Styles.FindStuffDetailAreaInput}
              onChangeText={value => setAddress(value)}
            />
          </View>
          <TouchableOpacity style={Styles.FindStuffDetailAreaBtnContainer}>
            <Text style={Styles.FindStuffDetailAreaBtn}>定位</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.FindStuffFooter}>
        <View style={Styles.FindStuffDescription}>
          <Text style={Styles.FindStuffDescription}>物品描述</Text>
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
            <Image source={Images.Camera} style={Styles.FindStuffImgUpload} />
            <Text style={{color: Colors.grey}}>添加图片</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.FindStuffImgGroupContainer}>
          <Image source={photoSrc} style={{width: 70, height: 70}} />
          <Image
            source={require('src/Images/Sample/Sample2.jpg')}
            style={{width: 70, height: 70}}
          />
          <Image
            source={require('src/Images/Sample/Sample2.jpg')}
            style={{width: 70, height: 70}}
          />
        </View>
      </View>
      <View style={Styles.FindStuffSubBtnContainer}>
        <TouchableOpacity style={Styles.FindStuffSubBtn} onPress={handleSubmit}>
          <Text style={Styles.FindStuffSubBtnText}>确认发布</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
