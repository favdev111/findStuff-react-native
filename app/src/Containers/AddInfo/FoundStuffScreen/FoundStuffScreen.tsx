import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Styles from './FoundStuffScreenStyle';
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect';
import {Images, Colors} from 'src/Theme';
import ChinaRegionWheelPicker from 'src/Lib/rn-wheel-picker-china-region';

import {store} from 'src/Store';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function FoundStuffScreen(props) {
  const [state, dispatch] = useContext(store);
  const [tag, setTag] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState([]);

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
        const name = response.uri;
        const source = {uri: response.uri};
        const data = 'data:image/jpeg;base64,' + response.data;

        setPhoto([...photo, {source, data, name}]);
      }
    });
  };

  async function handleSubmit() {
    if (tag === '' || place === '' || address === '' || description === '') {
      Toast.show('Input values correctly!');
      return;
    }

    if (photo && photo.length > 0) {
      let formData = new FormData();
      photo.forEach(ph => {
        const file = {
          uri: ph.name,
          name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
          type: ph.mime || 'image/jpeg',
        };
        formData.append('photo', file);
      });

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
              user: state.user._id,
            })
            .then(function(response2) {
              if (response2.data) {
                Toast.show('Success!');
                props.navigation.navigate('MainScreenWithBottomNav');
              } else {
                Toast.show('Failed!');
              }
            })
            .catch(function(error) {
              Toast.show(error);
            });
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    } else {
      Toast.show('No photo selected');
    }
  }

  useEffect(() => {
    if (!state.auth_token) props.navigation.navigate('Signin');
  }, []);

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
          <View>
            <Text>选择地点</Text>
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
          <View>
            <Text>详细地址</Text>
          </View>
          <View>
            <TextInput
              style={Styles.FindStuffDetailAreaInput}
              onChangeText={value => setAddress(value)}
            />
          </View>
          <TouchableOpacity>
            <Text style={Styles.FindStuffDetailAreaBtn}>定位</Text>
          </TouchableOpacity>
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
            <Image source={Images.Camera} style={Styles.FindStuffImgUpload} />
            <Text style={{color: Colors.grey}}>添加图片</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.FindStuffImgGroupContainer}>
          {photo &&
            photo.map((ph, i) => (
              <Image
                key={i}
                source={ph.source}
                style={{width: 70, height: 70}}
              />
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
}
