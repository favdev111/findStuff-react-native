import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Styles from './SignUpScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput';
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn';
import CustomVerifyInput from 'src/Components/CustomForm/CustomVerifyInput/CustomVerifyInput';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {Images} from 'src/Theme';
import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function SignUpScreen(props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState({});

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

        setPhoto({source, data, name});
      }
    });
  };

  async function handleSubmit() {
    if (name === '' || otp === '' || phone === '' || photo === '') {
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
          console.log(response.data.file.path);
          axios
            .post(baseUrl + 'api/user', {
              name,
              phone,
              password,
              photo: response.data.file.path,
            })
            .then(function(response2) {
              if (response2.data) {
                Toast.show('Success!');
                props.navigation.navigate('Signin');
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

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={Styles.SignUpHeader}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Signin')}
            style={{flex: 1}}>
            <Image
              source={Images.whiteLeftChevron}
              style={Styles.SignUpHeaderImg}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 25, color: '#fff', flex: 1}}>用户注册</Text>
          <Text style={{flex: 1}}></Text>
        </View>
        <View style={Styles.SignFormContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={Styles.SignName}>
              <CustomTextInput
                CustomLabel={'名字'}
                CustomPlaceholder={'请输入名字码'}
                proc={value => {
                  setName(value);
                }}
              />
            </View>

            <View style={Styles.SignPhoneInput}>
              <CustomTextInput
                CustomLabel={'手机'}
                CustomPlaceholder={'请输入手机号码'}
                proc={value => setPhone(value)}
              />
            </View>
          </View>
          <View style={Styles.SignVerifyInput}>
            <CustomVerifyInput
              CustomVerifyLabel={'验证码'}
              CustomPlaceholder={'请输入验证码'}
              proc={value => {
                setOtp(value);
              }}
            />
          </View>
          <View style={Styles.SignPwdInput}>
            <CustomPwdInput
              CustomPwdLabel={'密码'}
              CustomPwdPlaceholder={'请输入密码'}
              proc={value => {
                setPassword(value);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'space-between',
            }}>
            <TouchableOpacity onPress={handlePhoto}>
              <Image
                style={{width: 70, height: 70}}
                source={
                  photo.source
                    ? photo.source
                    : require('src/Images/Sample/Sample2.jpg')
                }
              />
            </TouchableOpacity>
            <View>
              <Text>选择你的照片</Text>
            </View>
          </View>

          <View style={Styles.SignBtn}>
            <FormCommonBtn CustomBtnTitle={'注册'} proc={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
